Chat
======================

# Features
* Basic functions such as comment, reply, room.


# Directories

* **backend** : A backend using [swagger-node](https://github.com/swagger-api/swagger-node).
* **frontend** : A frontend application by [React](https://facebook.github.io/react/) and [Flux](https://facebook.github.io/flux/).

# Usage

## On your laptop (for development)

1. Start the backend application.

    ```sh
    cd [APP_DIR]/backend
    vi config.js # If you need to change the configuration of backend.
    npm install
    npm start
    ```

2. Start the frontend application.

    ```sh
    cd [APP_DIR]/frontend
    npm install
    npm start
    ```

## On K5 by Fujitsu

We recommend using [K5 PaaS CF](http://www.fujitsu.com/global/solutions/cloud/k5/paas/) by which you can easily deploy the application.

### Preparation

1. Deploy following buildpacks. ([CF Document](https://cf-docs.jp-east-1.paas.cloud.global.fujitsu.com/en/manual/tut/tut/topics/c-service-catalog-deploy.html))
    * Node.js buildpack for the backend application
    * Static file buildpack for the frontend application

2. Configure the CLI tool for CF. ([CF Document](https://cf-docs.jp-east-1.paas.cloud.global.fujitsu.com/en/manual/tut/tut/topics/t-dev-pre-cf.html))

### Deployment

#### Backend application

1. Set node engine version of `package.json`.

    ```json@package.json
    "engines": {
      "node": "6.*"
    },
    ```

2. Deploy the backend application.

    ```sh
    cd [APP_DIR]/backend
    vi config.js # If you need to change the configuration of backend.
    cf push [YOUR_BACKEND_APPLICATION_NAME]
    ```

#### Frontend application

1. Build the frontend application.

    ```sh
    cd [APP_DIR]/frontend
    export API_URL=[BACKEND_URL]
    npm install
    npm run build
    ```

2. Deploy the frontend application

    ```sh
    cd [APP_DIR]/frontend/public
    cf push [YOUR_FRONTEND_APPLICATION_NAME]
    ```



## **MODIFY! MODIFY! MODIFY!**

Not to mention that, it's just out of a template. Better you modify, finner your application become. So let's play with it.

## Version

* [1.1.0]: Release


## License

MIT

