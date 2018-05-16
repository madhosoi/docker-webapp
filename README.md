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


## Version

* [1.1.0]: Release


## License

MIT

