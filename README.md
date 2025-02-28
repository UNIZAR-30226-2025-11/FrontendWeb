# Frontend Web for Explodding Kittens

Here we show how to launch the json-server and the web application.

## Server

For running the server, first you have to install the json server with the following command.

```
npm install json-server
```

Then, you can run the following command.

```
json-server --watch db.json --port 5000
```

## Web page

For running the web application, you should build the docker container with the following command.

```
docker build -t frontend-web .
```

Once you have done this, you should do the following command for running the image of the container.

```
docker run -p 5173:5173 frontend-web
```

A link should appear in the terminal that redirects to the web page.
