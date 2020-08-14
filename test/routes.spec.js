//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

let mongoose = require("mongoose");
//let Toolkit = require('../server/models/Toollkit.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();
let toolkitsRoute = require('../server/controllers/routes/toolkits.js');
const connection = require('../server/server.js');

chai.use(chaiHttp);
//Our parent block

describe('GET api/toolkits',() => 
{
    //open before the test
    /*before((done)=> {
        connection.connect()
        .then(()=> done())
        .catch((err) => done(err));
    });

    after((done) => {
        connection.close()
            .then(() => done())
            .catch((err) => done(err));
    });*/

    it('should get all my toolkits',(done)=>{
        request(toolkitsRoute)
        .get('/')
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            //response.body.length.should.be.eq(3);
        done();
        })
        /*.then((response)=>{
            const body = response.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('author');
            done();
        })*/
            .catch((err) => done(err));
    })

});

/*describe('Client Routes', () => {

});*/
/*
describe('POST/toolkits')


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

});*/