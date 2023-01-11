
# NASA PROJECT

It is a full stack MERN application , consisting of both front-end
and back-end functionalities .



## What does the project does:

In the main part of front-end interface , thier is a launch section,
where u can schedule upcoming missions, to one of the kepler exoplanets.

The launch would then be added and can be viewed in upcoming launches section.
You have the functionality to abort launches if need be.

And in the history section , you can view all the spaceX launches {data is provided by spacex api}
since year 2006 , as well as your custom launches, that you may have aborted.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Suksham-sharma/NASA-PROJECT.git
```

Go to the project directory

```bash
  cd NASA-PROJECT
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run build
```

This should un your project you can view your project at:
http://localhost:8000/ || or the port you added.


you can know more about how to run project under package.json scripts

## .env Variables


`MONGO_URL` go to Mongo Atlas {Online mongo database} and set up a database,
add the url to .env file.


## Tech Stack

**Client**

React, Redux , React-Router

Arwes Package {For all the sci-fi animation}


**Server** 

Node, Express 

PACKAGES: cors , axios , mongoose , csv-parse 
