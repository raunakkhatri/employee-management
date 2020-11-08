#Get nodejs Base image
FROM node:12-alpine as base
#Get pm2 base image
FROM keymetrics/pm2:12-alpine

#Creating a new directory for app in the container
RUN mkdir -p /usr/src/app
#setting working directory in the container
WORKDIR /usr/src/app

#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json ./
# installing the dependencies into the container
RUN npm install --quiet && npm audit fix

#copying the source code of Application into the container dir
COPY . /usr/src/app
#container exposed network port number
EXPOSE 3000
#command to run within the container with help of pm2 process manager
CMD ["pm2-runtime", "start", "ecosystem.config.js"]