FROM node:20-alpine as build-stage

RUN apk add android-tools

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x ./install_adb_key.sh

CMD ["./install_adb_key.sh"]
