#Express proxy BE for Angular FE
FROM node:latest

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/

RUN npm install

ENV PROD=true

COPY . /usr/src/app/

CMD ["node", "server.js"]
