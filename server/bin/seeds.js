const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Tool = require("../models/Tool");
const Toolkit = require("../models/Toolkit");
const Competency = require("../models/Competency");

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
        name: "Civic Service Design",
        author: "author_1",
        version:"1.0.0",
        category:"design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    }),
    new Toolkit({
        name: "The Field Guide ot Human Centered Design",
        author: "author_2",
        version: "1.0.0",
        category: "design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    }),
    new Toolkit({
        name: "Circular Design Guide",
        author: "author_3",
        version: "1.0.0",
        category: "design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    }),
    new Toolkit({
        name: "The Digitcal Society Shoool Design Method TK",
        author: "The Digitcal Society Shoool",
        version: "1.0.0",
        category: "design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    })
    ,
    new Toolkit({
        name: "TDesign Sprint",
        author: "another_author",
        version: "1.0.0",
        category: "design",
        url_link: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon"
    })
];

let toolDocs = [
    new Tool({
        name: "Interview",
        _toolkits: toolkitDocs[0]._id
    }),
    new Tool({
        name: "Immersion",
        _toolkits: toolkitDocs[1]._id
    }),
    new Tool({
        name: "Shadowing",
        _toolkits: toolkitDocs[2]._id
    }),
    new Tool({
        name: "Survey",
        _toolkits: toolkitDocs[3]._id
    })
];

let competenciesDocs = [
    new Competency({
        name: "Ability to Learn",
        _tools: toolDocs[0]._id
    }),
    new Competency({
        name: "Critical Thinking",
        _tools: toolDocs[1]._id
    }),
    new Competency({
        name: "Ethics",
        _tools: toolDocs[2]._id
    }),
    new Competency({
        name: "Complex Problem Solving",
        _tools: toolDocs[3]._id
    })
    ,
    new Competency({
        name: "Empathy",
        _tools: toolDocs[3]._id
    }),
    new Competency({
        name: "Collaboration",
        _tools: toolDocs[3]._id
    })
];




Promise.all([
    Tool.deleteMany(),
    Toolkit.deleteMany(),
    Competency.deleteMany()
])
    .then(() => {
        console.log('All tools and toolkits have been deleted');

        return Promise.all([
            Tool.create(toolDocs),
            Toolkit.create(toolkitDocs),
            Competency.create(competenciesDocs)
        ])
    })
    .then(() => {
        console.log(`${toolkitDocs.length} toolkits created`);
        console.log(`${toolDocs.length} tools created`);
        console.log(`${competenciesDocs.length} competencies created`);
        mongoose.disconnect();
    })
    .catch(err => {
        mongoose.disconnect();
        throw err;
    });