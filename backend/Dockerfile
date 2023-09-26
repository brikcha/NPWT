FROM node:16.20.1

WORKDIR /backend/backend
COPY  package*.json ./
RUN npm install -f
RUN npm rebuild bcrypt --build-from-source
COPY . .
EXPOSE 5000 

CMD ["npm", "run", "start-prod"]