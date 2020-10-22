FROM node as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node
WORKDIR /app
COPY --from=build /app/dist .
COPY --from=build /app/package.json .
RUN npm i --only=prod
CMD ["node", "main.js" ]