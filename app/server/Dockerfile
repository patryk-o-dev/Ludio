FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

RUN DATABASE_URL="mysql://root:temporary@localhost:3306/capyquiz" npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod:docker"]