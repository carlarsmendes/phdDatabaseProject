// model/Competency.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const CompetencySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        minlength: 1
    },
    summary: {
        type: String,
        default:'Brief summary of the competency here'
    },
    sources:[String],
    _tools: [{ type: Schema.Types.ObjectId, ref: 'Tool' }],
    _other_competencies: [{ type: Schema.Types.ObjectId, ref: 'Competency' }]
    }, 
    { timestamps: true }
);

// export our module to use in server.js

module.exports = mongoose.model('Competency', CompetencySchema);