FROM node:slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]