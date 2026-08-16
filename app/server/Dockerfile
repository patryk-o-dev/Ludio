FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set registry https://registry.npmjs.org

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod:docker"]