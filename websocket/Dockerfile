
FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json
RUN npm install
COPY . /usr/src/app/


#CMD ["npm", "start"]
