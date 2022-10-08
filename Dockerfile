FROM node:alpine

WORKDIR /api

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

# server side docker container ignores copying client folder because the container runs in development environment