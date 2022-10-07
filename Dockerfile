FROM node:16.15.0 as base

RUN mkdir /usr/app
WORKDIR /usr/app
COPY . /usr/app

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "start"]
