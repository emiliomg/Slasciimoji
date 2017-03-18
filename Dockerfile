FROM node:6-alpine

WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

COPY . /app

ENV PORT=80

RUN rm -rf /app/.git

CMD ["npm", "start"]

EXPOSE 80
