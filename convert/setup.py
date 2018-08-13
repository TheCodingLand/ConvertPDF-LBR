from cx_Freeze import setup, Executable

base = None    

executables = [Executable("main-windows.py", base=base)]

packages = ["idna", "math", "glob", "os", "random", "shutil", "time", "re", "fnmatch", "sys", "subprocess", "logging","redis", "magic"]
options = {
    'build_exe': {    
        'packages':packages,
    },    
}

setup(
    name = "converter",
    options = options,
    version = "1",
    description = 'covertisseur pdf',
    executables = executables
)
