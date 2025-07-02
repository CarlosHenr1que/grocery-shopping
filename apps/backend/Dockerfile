FROM docker.io/node:lts-alpine

WORKDIR /app

COPY apps/backend/dist grocery-shopping-backend/
COPY package.json grocery-shopping-backend/

RUN npm --prefix grocery-shopping-backend --omit=dev -f install

CMD [ "node", "grocery-shopping-backend/main.js" ]
