FROM node:23 AS build

WORKDIR /usr/src/app/
COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:23 AS production

WORKDIR /usr/src/app/

COPY package*.json .
RUN npm ci --only=production

COPY --from=build /usr/src/app/dist /usr/src/app/dist

CMD ["sh", "-c", "npm run start"]

EXPOSE 3000