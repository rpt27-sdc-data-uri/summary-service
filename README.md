# Project Publisher's Summary Service
Demo
![Deploy](https://github.com/huang-pei-mei/FEC-Publishers-Summary/blob/master/Final%20Audible%20Item%20Page.gif)

![Deploy](https://github.com/huang-pei-mei/FEC-Publishers-Summary/blob/master/Summary%201.jpg)

![Deploy](https://github.com/huang-pei-mei/FEC-Publishers-Summary/blob/master/Screen%20Shot%202021-06-12%20at%201.12.15%20PM.jpg)

![Deploy](https://github.com/huang-pei-mei/FEC-Publishers-Summary/blob/master/Screen%20Shot%202021-06-12%20at%201.12.38%20PM.jpg)

## Table of Contents
- [Project Publisher's Summary Service](#project-publishers-summary-service)
  - [Table of Contents](#table-of-contents)
- [Overview: Audible Publishers Summary](#overview-audible-publishers-summary)
  - [Related Services](#related-services)
  - [My contributions](#my-contributions)
  - [Requirements](#requirements)
  - [Development](#development)
    - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Copyright and License](#copyright-and-license)


# Overview: Audible Publishers Summary
This is an mock-up audible item page built during the Hack Reactor immersive's Front End Capstone project. This project is designed to maintain all original functionality and mimic the style of audible item page. This component of the project - Publisher's Summary Service - displayes the publisher's summary and copyright information for a given book.

## Related Services

  - https://github.com/huang-pei-mei/title-service
  - https://github.com/huang-pei-mei/reviews-service
  - https://github.com/huang-pei-mei/price-service
  - https://github.com/huang-pei-mei/FEC-Agg.Review

## My contributions
Designed and built the Publisher's Review Service.
Coordinated and deployed entire team’s modules on proxy server in AWS EC2 instance.
Utilized agile workflow practices on a 4 -person remote team.

## Requirements
An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm)
Node 6.13.0.

## Development
The database folder includes two helper functions which generates random data and populates the generated data into the database. The first helper function which generates random data and save the generated data into the database is located in database/populateData.js file. The mongo db setup file which specifies the database schema is located in database/index.js file

The App componet which includes RenderDom is located in client/src/index.js file. Using the following url `http://localhost:1220/api/summary/${bookId}` the app component fetches publisher's summary and copyright information for a given book from the server to be rendered.

The server with two endpoints are located in server/index.js. The first endpoint is `/api/summary/:bookId` This takes a random book id and returns an object with the following data {id: Number, summary: String, short_summary: String, copyright: String}.

The second endpont`http://localhost:1220/api/summaries/:bookIds` will accept array of book ids and returns an array of objects with the following data for each of the book ids {id: Number, summary: String, short_summary: String, copyright: String}

The third endpoint is '/api/create/summary' This endpoint will accept a request body with the keys of id, summary, short_summary, and copyright. This will be saved to the database as a new record.

The fourth endpoint is '/api/delete/summary/:bookId' This endpoint will take the provided bookId, search for it in the database and delete that record.

### Usage
Clone the repository from github into your local machine to make edits.
Code is available to view on github at https://github.com/huang-pei-mei/FEC-Publishers-Summary.
Once you clone the repository, from within the root directory:

npm install
This will install the main react front end and server side dependencies.


Make sure to install Mongo DB and then from the root directory:

npm run database/populateData
Seed the database

npm run react-dev
Builds the app for production to the public folder. It correctly bundles React in production mode and optimizes the build for the best performance.

Make sure nodemon is installed on your system and then from the root directory:

npm run start
Runs the app in the development mode. Open http://localhost:1220 to view it in the browser.



## Technologies Used
  JavaScript
  React
  Node/Express
  Mongo Db
  Webpack
  Babel
  Jest
  Enzyme
  SuperTest
  AWS (EC2, S3)

## Copyright and License
The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php


