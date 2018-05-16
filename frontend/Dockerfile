FROM node:8.11 AS build
ADD . /app
WORKDIR /app
ENV API_URL=http://192.168.99.10:8080/
RUN npm install && npm run lint && npm run test && npm run build

# FROM httpd:latest
# COPY --from=build /app/public/ /usr/local/apache2/htdocs/

FROM nginx:1.14-alpine
COPY --chown=nginx:nginx --from=build /app/public/ /usr/share/nginx/html

EXPOSE 80