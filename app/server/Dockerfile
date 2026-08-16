FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod:docker"]