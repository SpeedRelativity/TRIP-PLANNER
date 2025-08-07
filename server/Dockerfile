# server/Dockerfile

FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # assumes "build": "tsc"

EXPOSE 5000
CMD ["node", "dist/server.js"]
