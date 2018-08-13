class Pdffile(object):
    def __init__(self, f, folder, workingdir, token):
        self.name = f
        self.path = folder
        self.workingdir = workingdir
        self.token = token
        self.tempdir = f"{self.workingdir!s}/{random.randint(0,9999999)!s}/"
        self.fullpath = f"{self.path!s}{self.name!s}"
        #self.redisKey = f"conversion.{self.name!s}".encode('latin-1','surrogatepass')
        self.redisKey= f"conversion.{self.name!s}"
        self.totalpages=0
        self.links = []