FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/app.js"]