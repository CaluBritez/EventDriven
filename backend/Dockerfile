FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 8000

# RUN npm run build

CMD ["npm", "run", "dev"]