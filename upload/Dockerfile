FROM node:alpine
WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json
RUN npm install
COPY . /usr/src/app/

RUN mkdir /data
RUN chmod 666 /data 
CMD node ./src/index.js