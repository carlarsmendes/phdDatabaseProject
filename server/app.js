'use strict';

const { join } = require('path');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
var cors = require('cors')
//const serveFavicon = require('serve-favicon');
//const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
//const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
//const PORT = parseInt(process.env.PORT, 10) || 3010;
//const URI = process.env.MONGODB_URI;
const app = express();

//app.use(express.static(join(__dirname, './../client/build')));
//app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(join(__dirname, './../client/build')));
//app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));


app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 24 * 15,
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        },
        store: new (connectMongo(expressSession))({
            mongooseConnection: mongoose.connection,
            ttl: 60 * 60 * 24
        })
    })
);
//app.listen(PORT, () => { console.log('We are live on ' + PORT); });
/*
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);*/
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


app.get('*', (req, res, next) => {
    res.sendFile(join(__dirname, './../client/build/index.html'));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;