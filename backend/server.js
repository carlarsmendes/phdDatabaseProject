// first we import our dependencies…
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const express = require('express')
import logger from 'morgan';
import mongoose from 'mongoose';
const nocache = require('nocache')
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

const uri = process.env.MONGODB_URI || `mongodb://localhost/IH-library-project3`;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Use our router configuration when we call /api
app.use('/api', router);
// app.use('/api', require('./routes'));


// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));