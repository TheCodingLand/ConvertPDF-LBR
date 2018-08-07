import math
import glob, os, random, shutil, time, re, fnmatch, sys
from subprocess import call
import logging
import redis
import sys, chardet
logging.error(sys.getdefaultencoding())
r = redis.StrictRedis(host='redis', port=6379, db=5)
pub = redis.StrictRedis(host='redis', port=6379)
#TODO Module : Refactor into a class, split classes into files, add path management for files in the class for intermediate image conversions (location of the latest conversion -> destination)
#TODO ReactJS web frontend : uploads, previews, websocket, downloads, notifications.
#TODO SERVER : API, worker queue.

os.environ['MAGICK_MEMORY_LIMIT']="1024MB" # Use up to *MB of memory before doing mmap
os.environ['MAGICK_MAP_LIMIT']="1024MB" # Use up to *MB mmaps before caching to disk
os.environ['MAGICK_AREA_LIMIT']="4096MB" # Use up to *MB disk space before failure
os.environ['MAGICK_FILES_LIMIT']="1024MB" # Don't open more than *file handles


class Pdffile(object):
    def __init__(self, f, folder, workingdir):
        self.name = f
        self.path = folder
        self.workingdir = workingdir
        self.tempdir = f"{self.workingdir!s}/{random.randint(0,9999999)!s}/"
        self.fullpath = f"{self.path!s}{self.name!s}"
        #self.redisKey = f"conversion.{self.name!s}".encode('latin-1','surrogatepass')
        self.redisKey= f"conversion.{self.name!s}"
        self.totalpages=0
        self.links = []


class Option(object):
    def __init__(self, algo, bias, radius, method, name):
        self.algo = algo
        self.bias = bias
        self.radius = radius
        self.method = method
        self.name = name


monitoringDir = "/media/docs/"
workingdir= os.getcwd()

options = []

options.append(Option(algo="localthresh",bias=5, radius=12, method=1, name= "DARK"))
options.append(Option(algo="localthresh",bias=15, radius=5, method=1, name = "LIGHT"))
options.append(Option(algo="localthresh",bias=3, radius=5, method=1, name = "MEDIUM"))

#TODO : replace glob.glob with this and rename files lowercase
def findfiles(which, where='.'):
    '''Returns list of filenames from `where` path matched by 'which'
       shell pattern. Matching is case-insensitive.'''
    
    # TODO: recursive param with walk() filtering
    rule = re.compile(fnmatch.translate(which), re.IGNORECASE)
    return [name for name in os.listdir(where) if rule.match(name)]


def copyImage(pdf):
    if not os.path.exists(f"{pdf.tempdir!s}images/"):
        os.makedirs(f"{pdf.tempdir!s}images/")
    
    command = f'convert -density 200 "{pdf.tempdir!s}{pdf.name!s}" {pdf.tempdir!s}images/image_0000.jpg'
    logging.warning(command)
    call(command, shell=True)


def extractPages(pdf):
    if not os.path.exists(f"{pdf.tempdir!s}images/"):
        os.makedirs(f"{pdf.tempdir!s}images/")
    for i in range(0, 2000):
        command = f'convert -density 200 "{pdf.tempdir!s}{pdf.name!s}"[{i!s}] {pdf.tempdir!s}images/image_{i:04}.jpg'
        logging.warning(command)
        returncode = call(command, shell=True)
        if returncode == 1:
            break


def convertImage(pdf, option):
    if not os.path.exists(f"{pdf.tempdir!s}converted/"):
        os.makedirs(f"{pdf.tempdir!s}converted/")
    for i in range(0,pdf.totalpages):
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "applying filter", "pages": pdf.totalpages, "progress" : f"{i!s}/{pdf.totalpages!s}" })
        pub.publish(pdf.redisKey, pdf.redisKey)
        command = f"{option.algo!s} -b {option.bias!s} -r {option.radius!s} -m {option.method!s} -n yes {pdf.tempdir!s}border/image_{i:04}.jpg {pdf.tempdir!s}converted/image_{i:04}.gif"
        logging.warning(command)
        call(command, shell=True)
        command= f'convert -density 200 {pdf.tempdir!s}converted/image_{i:04}.gif -compress group4 "{pdf.tempdir!s}converted/image_{i:04}.pdf"'
        logging.warning(command)
        call(command, shell=True)
        

def addBorderA4(pdf):
    if not os.path.exists(f"{pdf.tempdir!s}border/"):
        os.makedirs(f"{pdf.tempdir!s}border/")
    for i in range(0,pdf.totalpages):
        command = f"convert {pdf.tempdir!s}shrink/image_{i:04}.jpg -gravity center -extent 1653x2339 {pdf.tempdir!s}border/image_{i:04}.jpg"
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "Make A4", "pages": pdf.totalpages, "progress" : f"{i!s}/{pdf.totalpages!s}" })
        pub.publish(pdf.redisKey, pdf.redisKey)
        logging.warning(command)
        call(command, shell=True)

def shrinkOnlyLarger(pdf):
    if not os.path.exists(f"{pdf.tempdir!s}shrink/"):
        os.makedirs(f"{pdf.tempdir!s}shrink/")
    for i in range(0,pdf.totalpages):
        command = f"convert {pdf.tempdir!s}images/image_{i:04}.jpg -resize 1653x2339\\> {pdf.tempdir!s}shrink/image_{i:04}.jpg"
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "Shrink to A4", "pages": pdf.totalpages, "progress" : f"{i!s}/{pdf.totalpages!s}" })
        
        logging.warning(command)
        call(command, shell=True)

def buildPdf(pdf,option):
    outputPdfPath=f"{pdf.path!s}converted/{option.name}_{pdf.name!s}"
    command = f'pdftk {pdf.tempdir!s}converted/image_*.pdf cat output "{outputPdfPath}"'
    #command = f'pdfunite {pdf.tempdir!s}converted/image_*.pdf "{outputPdfPath}"'
    logging.warning(command)
    #r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "finished", "output": outputPdfPath })
    call(command, shell=True)
    pdf.links.append(f"{option.name}_{pdf.name!s}")
    r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "finished" , "links" : pdf.links, "progress" : "100%" })
    time.sleep(1)
    pub.publish(pdf.redisKey, pdf.redisKey)

def imageToPdf(pdf,option):
    pdfname = pdf.name.replace(".jpg",".pdf")
    command= f'convert -density 200 {pdf.tempdir!s}converted/image_*.gif -compress group4 "{pdf.path!s}converted/{pdfname!s}"'
    logging.warning(command)
    call(command, shell=True)
    #outputpath = f"{pdf.path!s}converted/{pdfname!s}"
    pdf.links.append(pdfname)
    r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "finished" , "links" : pdf.links, "progress" : "100%" })
    time.sleep(1)
    pub.publish(pdf.redisKey, pdf.redisKey)

def lookForFiles(folder):
    time.sleep(2)
    os.chdir(folder)
    pdffiles = glob.glob("*.pdf")
    
    for f in pdffiles:
        
        pdf = Pdffile(f, folder, workingdir)

        if not os.path.exists(f"{pdf.tempdir!s}"):
            os.makedirs(f"{pdf.tempdir!s}")
        try:
            shutil.move(pdf.fullpath, pdf.tempdir)
        except:
            continue
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "started" })
        pub.publish(pdf.redisKey, pdf.redisKey)
        os.chdir(workingdir)
        extractPages(pdf)
        
        pdf.totalpages = len(os.listdir(f'{pdf.tempdir!s}images/'))
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "pages extracted", "pages": pdf.totalpages })
        
        pub.publish(pdf.redisKey, pdf.redisKey)
        logging.warning(pdf.totalpages)
        shrinkOnlyLarger(pdf) #tempdir to shrink
        addBorderA4(pdf) #shrink to border
        i=0
        for option in options:
            i=i+1
            convertImage(pdf,option) #border to converted
            buildPdf(pdf,option)
            
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "completed"})
        time.sleep(1)
        pub.publish(pdf.redisKey, pdf.redisKey)
        r.expire(pdf.redisKey, 60)
        try:
            call(f'rm -rf {pdf.tempdir!s}', shell=True)
        except:
            logging.warning("could not delete temp dir, will be cleaned up with cronjob")
        
    os.chdir(folder)
    imagefiles = glob.glob("*.jpg")

    for f in imagefiles:
        #os.chdir(workingdir)
        
        
        pdf = Pdffile(f, folder, workingdir)
        if not os.path.exists(f"{pdf.tempdir!s}"):
            os.makedirs(f"{pdf.tempdir!s}")
        try:
            shutil.move(pdf.fullpath, pdf.tempdir)
        except:
            pass
        os.chdir(workingdir)
        copyImage(pdf)
        pdf.totalpages = len(os.listdir(f'{pdf.tempdir!s}images/'))
        logging.warning(pdf.totalpages)
        shrinkOnlyLarger(pdf) #tempdir to shrink
        addBorderA4(pdf) #shrink to border
        option = options[0]
       
        convertImage(pdf,option) #border to converted
        imageToPdf(pdf,option)
        r.hmset(pdf.redisKey,{ "name" : pdf.name, "status" : "completed"})
        time.sleep(1)
        pub.publish(pdf.redisKey, pdf.redisKey)
        r.expire(pdf.redisKey, 60)
        try:
            call(f'rm -rf {pdf.tempdir!s}', shell=True)
        except:
            logging.warning("could not delete temp dir, will be cleaned up with cronjob")
    
while True:
    time.sleep(10)
    try:
        lookForFiles(monitoringDir)
    except:
        continue
