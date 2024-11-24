# job-board

# Setps to run database & api & ui. 
1. Run `docker-compose up` to run the database in the foreground 
2. Run `./gradlew run` to run the api server
3. Run `cd ./job-board-ui` & `npm start` to run the ui application
    - The UI application `package.json` is configured to proxy requests to the API server via the `proxy` configuration.