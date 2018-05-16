FROM node:8.11

ADD . app
WORKDIR app

RUN npm install --save-prod

ENV PORT=8080

ENTRYPOINT npm start

EXPOSE 8080