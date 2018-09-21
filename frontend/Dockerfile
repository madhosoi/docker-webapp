FROM node:8.11 AS build
ADD . /app
WORKDIR /app
ARG API_URL
ENV API_URL=${API_URL:-'http://192.168.99.10:8080/'}

ARG API_TOKEN_URL
ENV API_TOKEN_URL=${API_TOKEN_URL:-'http://192.168.99.10:8080/'}

ARG API_USER
ENV API_USER=${API_USER:-'user'}

ARG API_PWD
ENV API_PWD=${API_PWD:-'pwd'}

RUN npm install && npm run lint && npm run test && npm run build

# FROM httpd:latest
# COPY --from=build /app/public/ /usr/local/apache2/htdocs/

FROM nginx:1.14-alpine
COPY --chown=nginx:nginx --from=build /app/public/ /usr/share/nginx/html

EXPOSE 80