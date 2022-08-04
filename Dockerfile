FROM node:16.8-alpine as build

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build


FROM node:16.8-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run start:prod