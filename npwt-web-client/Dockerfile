FROM node:18.14.2-alpine
WORKDIR /npwt-front-app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm","start"]