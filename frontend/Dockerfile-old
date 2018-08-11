FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -yq curl git nano
RUN apt-get install -y npm
RUN npm install -g npm
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g http-server

RUN mkdir -p /usr/src/app

RUN npm install npm@latest -g
WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json
RUN npm install
COPY . /usr/src/app/

RUN npm run build
RUN mkdir -p /usr/app/www/
RUN yes | cp -rf /usr/src/app/build/* /usr/app/www/

WORKDIR /usr/app/www/
#CMD ["npm", "start"]

CMD ["http-server", "--cors"]