//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Toolkit = require('../controllers/models/Toollkit');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block


/*describe('Client Routes', () => {

});*/

describe('API Routes', () => {


    before(() => {
        // Run migrations and seeds for test database
        database.migrate.latest()
            .then(() => done())
            .catch((error) => {
                throw error;
            })
            .done();
    });

    beforeEach((done) => {
        // Would normally run run your seed(s), which includes clearing all records
        // from each of the tables
        database.seed.run()
            .then(() => done())
            .catch((error) => {
                throw error;
            })
            .done(); // Need to call the done function because this is not a promise/async
    });

});