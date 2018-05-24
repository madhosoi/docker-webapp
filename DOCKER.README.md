Docker Development
======================

# Tasks
* docker-machine env default | Invoke-Expression
* docker login cnetsdiegom.azurecr.io
* cd .\backend\
* docker build -t cnetsdiegom.azurecr.io/webapp-backend:0.1 .
* docker image push cnetsdiegom.azurecr.io/webapp-backend:0.1
* cd ..\frontend\
* docker build -t cnetsdiegom.azurecr.io/webapp-frontend:0.1 .
* docker image push cnetsdiegom.azurecr.io/webapp-frontend:0.1
* docker pull mongo:latest
* docker image tag mongo:latest cnetsdiegom.azurecr.io/webapp-mongo:0.1
* docker image push cnetsdiegom.azurecr.io/webapp-mongo:0.1
* docker image prune
* docker image pull ubuntu:latest
* docker container run --name kompose -it -d ubuntu:latest
* docker container exec -it kompose bash
*  - curl -L https://github.com/kubernetes/kompose/releases/download/v1.13.0/kompose-linux-amd64 -o kompose
*  - chmod +x kompose
*  - mv kompose /usr/local/bin/kompose
* docker commit kompose kompose:latest
* docker container run -it -d --name kompose -v /c/Users/<user>/Sources/docker-webapp:/webapp kompose:latest
* docker container exec -it kompose bash
*  - cd webapp && kompose convert