const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Tool = require("../models/Tool");
const Toolkit = require("../models/Toolkit");

//const bcryptSalt = 10;

require('../configs/database');
/*
let userDocs = [
    new User({
        email: "alice@gmail.com",
        password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    }),
    new User({
        email: "bob@gmail.com",
        password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    })
]*/

//let streetArtDocs = [
let toolkitDocs = [
    new Toolkit({
        name: "toolkit_1",
        author: "author_1",
        version:"1.0.0",
        category:"design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    }),
    new Toolkit({
        name: "toolkit_2",
        author: "author_2",
        version: "1.0.0",
        category: "design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    }),
    new Toolkit({
        name: "toolkit_3",
        author: "author_3",
        version: "1.0.0",
        category: "design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    })
]

let toolDocs = [
    new Tool({
        _toolkits: toolkitDocs[0]._id
    }),
    new Tool({
        _toolkits: toolkitDocs[1]._id
    }),
    new Tool({
        _toolkits: toolkitDocs[2]._id
    })
]


Promise.all([
    Tool.deleteMany(),
    Toolkit.deleteMany()
])
    .then(() => {
        console.log('All tools and toolkits have been deleted');

        return Promise.all([
            Tool.create(toolDocs),
            Toolkit.create(toolkitDocs)
        ])
    })
    .then(() => {
        console.log(`${toolkitDocs.length} toolkits created`);
        console.log(`${toolDocs.length} tools created`);
        mongoose.disconnect();
    })
    .catch(err => {
        mongoose.disconnect();
        throw err;
    })