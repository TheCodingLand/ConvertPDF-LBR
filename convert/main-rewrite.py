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

redis_in = redis.StrictRedis(host=redishost,decode_responses=True, port=6379, db=2)
redis_out = redis.StrictRedis(host=redishost, port=6379, db=5)
redis_pub = redis.StrictRedis(host=redishost, port=6379)

comm = apiComm()

class apiComm:
    def __init__(self):
        redis_in=redis_in
        redis_out = redis_out
        redis_pub = redis_pub
    def sendUpdate(self,command):
        out.hmset()
        pub.publish()
    def getNewMessage(self, service):
        keys = redis_in.keys(f'{service}.*')
        if len(keys) >0:
            key = keys[0]
            logging.info(key)
            new_message = redis_in.hgetall(key)
            redis_in.delete(key)
            return new_message

        

class Command:
    def __init__(self, name, command, page ):
        self.name=name
        self.command=command
        self.page=page

    def run(self,):
        logging.info(f"runnung {self.command}")
        comm.sendUpdate(self)
        call(command, shell=True)    


class A_file(object):
    def __init__(self, name, token):
        self.name = name
        self.token = token
        self.redisKey= f"conversion.{self.name!s}"
        self.totalpages=1
        self.links = []
        self.tempdir = f"{working_dir!s}/{token!s}"
        self.tempdirImg= f"{tempdir!s}/images"
        self.mimetype=""

    def prepare(self):
        if not os.path.exists(f"{self.tempdir!s}"):
            os.makedirs(f"{self.tempdir!s}")
        shutil.move(f"{in_files_dir}/{self.name}", self.tempdir)
        self.detectType()
        
        if self.mimetype == "pdf":
            self.extract()
            self.totalpages = len(os.listdir(f'{pdf.tempdirImg}'))
        

    def extract(self):
        while true:
            
            r.hmset(self.redisKey,{ "name" : self.name, "status" : "extracting pages", "progress" : i })
            pub.publish(self.redisKey, self.redisKey)
            command = f'convert -density 200 "{self.tempdir!s}/{self.name!s}"[{i!s}] {self.tempdir!s}/images/image_{i:04}.jpg'
            logging.info(command)
            returncode = call(command, shell=True)
            if returncode == 1:
                break
    def preview(self):
        return True
    def convert(self):
        for i in range(0,self.totalpages):
            convertPage(f"image_{i:04}.jpg",f"image_{i:04}.pdf",radius, bias, i)

    def convertPage(self, infile,outfile,radius, bias, page):
        infile = f"image_{i:04}.jpg"
        #outfile =infile = f"image_{i:04}.gif"
        size = radius/3
        pid=os.getpid()
        tmpA1=f"{tempdir}/autothresh1_A_{pid}.mpc"
        tmpA2=f"{tempdir}/autothresh1_A_{pid}.cache"
        tmpM1=f"{tempdir}/autothresh1_M_{pid}.mpc"
        tmpM2=f"{tempdir}/autothresh1_M_{pid}.cache"
        tmpT1=f"{tempdir}/autothresh1_T_{pid}.mpc"
        tmpT2=f"{tempdir}/autothresh1_T_{pid}.cache"
        commands = [ 
        command("Réduis en A4", f"convert {infile} -resize 1653x2339\\> {infile}",page),
        command("Etendre en A4", f"convert {infile} -gravity center -extent 1653x2339 {infile}",page),
        command("Niveau de gris", f"convert -quiet {infile} -colorspace gray -alpha off +repage {tmpA1}",page),
        command("Négatif",f"convert {tmpA1} -negate {tmpA1}",page),
        command("Flou calculé",f"convert {tmpA1} -blur {size} {tmpM1}",page),
        command("Calcul des niveaux Adaptatif locaux :",f"convert {tmpA1} {tmpM1} +swap -compose minus -composite -threshold {bias} {tmpT1}",page),
        command("Négatif",f"convert {tmpT1} -negate {infile}",page),
        command("CCITT FAX G4",f'convert -density 200 {infile!s} -compress group4 "{outfile}"',page),
        ]
        for command in commands:
            command.run()



def getRedisUpdates(servicename):
    message = comm.getNewMessage(servicename)

    filename = message.get('filename')
    token= message.get'token')
        
    
    logging.info("Found PDFs : " )
    logging.info(filename)
        
    inputfile = A_file(filename, token)

    inputfile.prepare()
    inputfile.convert()
        
     
#Upload => valider mimetype => extraire page 1
#Preview => prendre parametre bias et radius => convertir page 1

#Convert => extraire pages si necessaire => lancer algo => reconstruire PDF
while True:
    time.sleep(2)
    getRedisUpdates('uploadpdf')
