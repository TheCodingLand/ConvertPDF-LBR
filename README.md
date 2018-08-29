# ConvertPDF-LBR

DEMO : https://pdfexp.com

This is a PDF conversion platform. 
It's goal is to provide PDF files comatible with the Register of Commerce's PDF formats.
It can generate any file needed for filing operations on this platform.

Most people encounter compression filters issues when interracting with this platform, resulting in errors "not adjustable", or "non ajustable"
This attempts to fix that by rasterizing documents, and applying transformations based on locad adaptive thresolding.
it also ensures a4 size and format.

Infrastructure is based on docker-compose :

- Frontend (web page in ReactJS)
- Websocket (sends updates from redis to the webpage)
- redis message queue : holds pending jobs, and events messages for UI
- Upload Server : simple multer implementation for the file upload
- Converted server : provides https access to the user's converted file
- Workers : several PDF conversion servers (scaled to 10 instances by default)

Prerequisites :
 - have a docker installation with docker-compose : https://docs.docker.com/
 - you need a dns zone that points to your machine hostname like : *.hostname.company.com
 - for https, you need to temporarly allow external access to http to get the letsencrypt certificates
 - for internal http access only, you just need to change the traefik/traefik.yml config file to not redirect to https (see the file itself)
 
then : 
- git clone https://github.com/TheCodingLand/ConvertPDF-LBR .
- edit the .env file, replace the D_HOST environment variable with hostname.company.com
- edit traefik/traefik.yaml to disable https redirection if needed
- type "docker-compose up"

You can now access the web UI at hostname.company.com



WINDOWS BUILD :

I have successfully build the conversion tool into a windows package. however it still needs a lot of work.



