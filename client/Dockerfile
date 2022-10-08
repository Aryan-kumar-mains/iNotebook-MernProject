FROM node:10 as build-stage

WORKDIR /app/client

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
