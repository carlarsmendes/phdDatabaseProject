'use strict';


// first we import our dependencies…
require('dotenv').config();

const debug = require('debug');
const app = require('./app');

const mongoose = require('mongoose');


const path = require('path');
//require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const MongoClient = require('mongodb').MongoClient; 
const bodyParser = require('body-parser');
/*
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';*/

//const nocache = require('nocache');
//const session = require("express-session");
//const MongoStore = require('connect-mongo')(session);
// and create our instances
//const app = express();
const router = express.Router();
const requireDir = require('require-dir');
const { Resolver } = require('dns');

// set our port to either a predetermined port number if you have set it up, or 3001
const PORT = parseInt(process.env.PORT, 10) || 3010;
const URI = process.env.MONGODB_URI;
//const API_PORT = process.env.PORT || 3010;
console.log("show api_port->", PORT);
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(logger('dev'));*/

const uri = process.env.MONGODB_URI || `mongodb://localhost/PHD-DB`;




const terminate = error => {
    if (error) debug(error);
    const exitCode = error && error instanceof Error ? 1 : 0;
    debug('Terminating node app.');
    mongoose.disconnect().finally(() => {
        debug('Disconnected from database.');
        process.exit(exitCode);
    });
};

process.on('SIGINT', () => terminate());
process.on('SIGTERM', () => terminate());
process.on('uncaughtException', error => {
    debug('There was an uncaught exception.');
    terminate(error);
});
process.on('unhandledRejection', error => {
    debug('There was an unhandled promise rejection.');
    terminate(error);
});

const onError = error => {
    const { syscall, port, code } = error;
    if (syscall === 'listen' && code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
    } else {
        console.error('There was an unknown error.');
        debug(error);
        throw error;
    }
};

const onListening = server => {
    const { port } = server.address();
    debug(`Node server listening on ${port}`);
    if (process.env.NODE_ENV === 'development')
        debug(`Visit http://localhost:${port} to develop your app`);
};

const initiate = () => {
    app.set('port', PORT);

    const server = app.listen(PORT);
    server.on('error', error => onError(error));
    server.on('listening', () => onListening(server));
};


mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        debug(`Database connected to URI "${URI}"`);
        initiate();
    })
    .catch(error => {
        console.error(`There was an error connecting the database to URI "${URI}"`);
        debug(error);
        process.exit(1);
    });

/*
function connect(){
    return new Promise((resolve, reject)=> {
        mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex:true })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
            if(err) return reject(err);
            resolve();
        })
        .catch(err => {
            console.error('Error connecting to mongo', err);
        });
    });
}

function close(){
    return mongoose.disconnect();
}*/

/*
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
*/

/*
// now we can set the route path & initialize the API
app.get('/', (req, res) => {
    console.log("get route");
    res.json({ message: 'Hello, World!' });
});

// Use our router configuration when we call /api
app.use('/api', router);

//app.use('/api', require('./routes/toolkits'));
//avoiding repetion on routes definition
var routes = requireDir('./controllers/routes'); // https://www.npmjs.org/package/require-dir
for (var i in routes) app.use('/api/', routes[i]);

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/

// For any other routes, redirect to the index.html file of React
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
*/

/*module.exports = {connect, close};*/
/*
module.exports = function (app) {
    app.use('/', router);
}*/