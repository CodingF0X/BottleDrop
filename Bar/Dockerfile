FROM node:18-alpine

RUN apk update && apk add curl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node", "app.js"]
