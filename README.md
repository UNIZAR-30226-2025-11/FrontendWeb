# Frontend Web for Explodding Kittens

Here we show how to launch the json-server and the web application.

## Local Deployment

First of all, download the packages using 

```sh
npm install
```

You need to create a .env file at the root directory, using .env.example as a reference:

```sh
cp .env.example .env
```

Make sure to update the .env file with your specific configuration values before proceeding.

Once it is installed, one can deploy it using
```sh
npm run dev
```

## Docker Deployment

### Build the Docker Image

To build the frontend container, run:

```sh
npm run compose:build
```

### Start the Frontend Container

To start the container, run:

```sh
npm run compose:up
```

### Stop & Remove the Container

To stop and remove the running container, run:

```sh
npm run compose:down
```