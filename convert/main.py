import magic

import math
import glob, os, random, shutil, time, re, fnmatch, sys
from subprocess import call
import logging
import redis
import sys

logging.basicConfig(level=logging.DEBUG)

redishost =os.environ.get('REDIS_HOST')

#TODO : make configurable by config maps ? 
os.environ['MAGICK_MEMORY_LIMIT']="1024MB" # Use up to *MB of memory before doing mmap
os.environ['MAGICK_MAP_LIMIT']="1024MB" # Use up to *MB mmaps before caching to disk
os.environ['MAGICK_AREA_LIMIT']="4096MB" # Use up to *MB disk space before failure
os.environ['MAGICK_FILES_LIMIT']="1024MB"

# PATHS : 
in_files_dir = "/data"
files_out_dir = "/data/converted"
working_dir = "/usr/src/app"

logging.info(f"Connecting to REDIS {redishost!s}")

class Option(object):
    def __init__(self, name, bias, radius):
        self.name = name
        self.bias = bias
        self.radius = radius
        

class apiComm:
    def __init__(self):
        self.redis_in= redis.StrictRedis(host=redishost,decode_responses=True, port=6379, db=2)
        self.redis_out = redis.StrictRedis(host=redishost, port=6379, db=5)
        self.redis_pub = redis.StrictRedis(host=redishost, port=6379)

    def sendUpdate(self,command,f):
        self.redis_out.hmset(f.redisKey,{ "name" : f.name, "status" : command.name, "progress":command.page, "pages": f.totalpages, "links" : f.links })
        self.redis_pub.publish(f.redisKey, f.redisKey)
        self.redis_out.expire(f.redisKey, 60)
        logging.info(command.command)

    def getNewMessage(self, service):
        keys = self.redis_in.keys(f'{service}.*')
        if len(keys) >0:
            key = keys[0]
            logging.info(key)
            new_message = self.redis_in.hgetall(key)
            self.redis_in.delete(key)
            return new_message
        else:
            return False

comm = apiComm()

class Command:
    def __init__(self, name, command, page):
        self.name=name
        self.command=command
        self.page=page

    def run(self,f):
        logging.info(f"running {self.command}")
        comm.sendUpdate(self,f)
        returncode = call(self.command, shell=True)  
        return returncode 


class A_file(object):
    def __init__(self, name, token, options):
        self.name = name
        self.inputfile = f"{in_files_dir}/{self.name}"
        self.token = token
        self.redisKey= f"conversion.{self.name!s}"
        self.totalpages=1
        self.links = []
        self.tempdir = f"{working_dir!s}/{token!s}"
        self.tempdirImg= f"{self.tempdir!s}/images"
        self.tempFile=f"{self.tempdir}/{self.name}"
        self.mimetype=""
        self.options = options
        
    def cleanup(self):
        
        call(f'rm -rf {self.tempdir!s}', shell=True)

    def detectType(self):
        ft= magic.from_file(self.tempFile, mime=True)
        ftarray = ft.split('/')
        if len(ftarray) ==2:
            if ftarray[0] == 'image':
                return "image"
            elif ftarray[1]=='pdf':
                return "pdf"
            else:
                return "unsupported"
        
        
    def prepare(self):
        if not os.path.exists(f"{self.tempdirImg!s}"):
            os.makedirs(f"{self.tempdirImg!s}")
        shutil.move(f"{in_files_dir}/{self.name}", self.tempFile)
        self.mimetype = self.detectType()

        
        if self.mimetype == "pdf":
            self.extract()
            self.totalpages = len(os.listdir(f'{self.tempdirImg}'))
        elif self.mimetype == "image":
            self.move()
            self.totalpages = len(os.listdir(f'{self.tempdirImg}'))
        else:
            logging.error('Unsupported file type')
            return False
        for i in range(0,self.totalpages):
            infile = self.tempdirImg+f"image_{i:04}.jpg"
            commands=[
            Command("Réduis en A4", f"convert {infile} -resize 1653x2339\\> {infile}",i),
            Command("Etendre en A4", f"convert {infile} -gravity center -extent 1653x2339 {infile}",i),]
        for command in commands:
            command.run(self)

    def extract(self):
        i=0
        while True:
            
            c = Command("Extraction des pages", \
            f'convert -density 200 "{self.tempFile}"[{i!s}] {self.tempdirImg}/image_{i:04}.jpg',i+1)
            i=i+1
            returncode = c.run(self)
            if returncode == 1:
                break
    def move(self):
        c = Command("Extraction des pages", \
            f'convert -density 200 "{self.tempFile}" {self.tempdirImg}/image_0000.jpg',1)
        c.run(self)

    def preview(self,option):
        self.convertPage(f"{self.tempdirImg}/image_0000.jpg",f"image_0000.jpg",option.radius, option.bias, 1)

        return True
    def convert(self,option):
        
        for i in range(0,self.totalpages):
            self.convertPage(f"{self.tempdirImg}/image_{i:04}.jpg",f"{self.tempdirImg}/image_{i:04}.pdf",option.radius, option.bias, i)


    def convertPage(self, infile, outfile,radius, bias, page):
        
        #outfile =infile = f"image_{i:04}.gif"
        size = radius/3
        pid=os.getpid()
        tmpA1=f"{self.tempdir}/autothresh1_A_{pid}.mpc"
        tmpA2=f"{self.tempdir}/autothresh1_A_{pid}.cache"
        tmpM1=f"{self.tempdir}/autothresh1_M_{pid}.mpc"
        tmpM2=f"{self.tempdir}/autothresh1_M_{pid}.cache"
        tmpT1=f"{self.tempdir}/autothresh1_T_{pid}.mpc"
        tmpT2=f"{self.tempdir}/autothresh1_T_{pid}.cache"
        commands = [ 
        
        Command("Niveau de gris", f"convert -quiet {infile} -colorspace gray -alpha off +repage {tmpA1}",page),
        Command("Négatif",f"convert {tmpA1} -negate {tmpA1}",page),
        Command("Flou calculé",f"convert {tmpA1} -blur {size} {tmpM1}",page),
        Command("Calcul des niveaux Adaptatif locaux :",f"convert {tmpA1} {tmpM1} +swap -compose minus -composite -threshold {bias} {tmpT1}",page),
        Command("Négatif",f"convert {tmpT1} -negate {infile}",page),
        Command("CCITT FAX G4",f'convert -density 200 {infile!s} -compress group4 "{outfile}"',page),
        ]
        for command in commands:
            command.run(self)
    def merge(self,opt):

        filename=self.name.split('.')
        filename= ''.join(filename[0:-1])
        filename=f'{opt.name}_{filename}.pdf'
        outputPdfPath=f"{files_out_dir!s}/{self.token}/{filename}"
        os.makedirs(f"{files_out_dir!s}/{self.token}/")
        self.links.append(f"{self.token}/{filename}")
        Command('Assemblage du document', f'pdftk {self.tempdirImg!s}/image_*.pdf cat output "{outputPdfPath}"',f"{self.totalpages}").run(self)
        

    
def DetectAndRun(servicename, options):
    message = comm.getNewMessage(servicename)
    if message != False:

        filename = message.get('filename')
        token= message.get('token')
        logging.info("Found file : " )
        logging.info(filename)
            
        inputfile = A_file(filename, token, options)

        inputfile.prepare()
        for option in options:
            
            inputfile.convert(option)
            inputfile.merge(option)
            Command('finished', f'',f"{inputfile.totalpages}")
            
        inputfile.cleanup()


#Upload => valider mimetype => extraire page 1
#Preview => prendre parametre bias et radius => convertir page 1


options = []

options.append(Option(bias=5, radius=12, name= "DARK"))
options.append(Option(bias=15, radius=5, name = "LIGHT"))
options.append(Option(bias=3, radius=5, name = "MEDIUM"))
#Convert => extraire pages si necessaire => lancer algo => reconstruire PDF
#Output => ajout des links, cleanup
while True:
    time.sleep(2)
    DetectAndRun('uploadpdf',options)
