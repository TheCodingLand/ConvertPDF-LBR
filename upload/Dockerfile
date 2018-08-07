FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -yq curl git nano
RUN apt-get install -y npm
RUN npm install -g npm
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN mkdir -p /usr/src/app
RUN npm install npm@latest -g
WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm install express
COPY . /usr/src/app/