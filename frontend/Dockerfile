FROM node:8.11 AS build
ADD . /app
WORKDIR /app
ARG API_URL
ENV API_URL=${API_URL:-'http://apidemobackend.k5.cloudmad.net/'}

ARG API_TOKEN_URL
ENV API_TOKEN_URL=${API_TOKEN_URL:-'http://apidemobackend.k5.cloudmad.net/'}

ARG API_USER
ENV API_USER=${API_USER:-'user'}

ARG API_PWD
ENV API_PWD=${API_PWD:-'pwd'}

RUN npm install && npm run build

# FROM httpd:latest
# COPY --from=build /app/public/ /usr/local/apache2/htdocs/

FROM nginx:1.14-alpine
COPY --chown=nginx:nginx --from=build /app/public/ /usr/share/nginx/html

EXPOSE 80