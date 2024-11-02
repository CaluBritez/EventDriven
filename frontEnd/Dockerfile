FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5174

# CMD ["serve", "-s", "dist", "-l", "5174"]
CMD ["npm", "run", "dev"]