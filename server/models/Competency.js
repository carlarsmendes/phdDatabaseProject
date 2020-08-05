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
    Summary: {
        type: String,
        default:'Brief summary of the competency here'
    },
    Sources:[String],
    _tools: [{ type: Schema.Types.ObjectId, ref: 'Tool' }],
    _competencies: [{ type: mSchema.Types.ObjectId, ref: 'Competency' }]
    }, 
    { timestamps: true }
);

// export our module to use in server.js
export default mongoose.model('Competency', CompetencySchema);