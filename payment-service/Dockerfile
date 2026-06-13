FROM node:22-alpine
RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8085

CMD ["npm","start"]
