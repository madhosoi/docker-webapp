# import credentials
# You can change the default deploy config with `make cnf="credentials_special.env" release`
cred ?= credentials.env
include $(cred)
export $(shell sed 's/=.*//' $(cred))

# import config.
# You can change the default config with `make cnf="config_special.env" build`
cnf ?= config.env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

debug:
	npm run startvm

# DOCKER TASKS
# Build the container
build: ## Build the container
	docker build --build-arg API_URL=$(API_URL) --build-arg API_TOKEN_URL=$(API_TOKEN_URL) --build-arg API_USER=$(API_USER) --build-arg API_PWD=$(API_PWD) -t $(DOCKER_REPO)/$(IMAGE_NAME):$(VERSION) .


run: ## Run container on port configured in `config.env`
	docker run -it --rm --name="$(IMAGE_NAME)" $(DOCKER_REPO)/$(IMAGE_NAME):$(VERSION)

rund: ## Run container on port configured in `config.env`
	docker run -it --rm -d --name="$(IMAGE_NAME)" $(DOCKER_REPO)/$(IMAGE_NAME):$(VERSION)