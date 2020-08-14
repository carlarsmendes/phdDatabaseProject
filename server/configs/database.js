const express = require('express');
const app = express();
const mongoose = require('mongoose');
// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3010;

// Don't forget to set "MONGODB_URI" in ~/server/.env
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
