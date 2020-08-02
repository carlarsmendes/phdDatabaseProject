// first we import our dependencies…
const path = require('path');
//require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const MongoClient = require('mongodb').MongoClient; 
const bodyParser = require('body-parser');
/*import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';*/
const mongoose = require('mongoose');
//const nocache = require('nocache');
//const session = require("express-session");
//const MongoStore = require('connect-mongo')(session);
// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3010;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(logger('dev'));*/

const uri = process.env.MONGODB_URI || `mongodb://localhost/PHD-DB`;

app.listen(API_PORT, () => { console.log('We are live on ' + API_PORT); });

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


// now we can set the route path & initialize the API
app.get('/', (req, res) => {
    console.log("get route");
;  res.json({ message: 'Hello, World!' });
});

// Use our router configuration when we call /api
app.use('/api', router);
app.use('/api', require('./routes'));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// For any other routes, redirect to the index.html file of React
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
*/