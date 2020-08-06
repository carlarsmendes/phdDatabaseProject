// model/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ToolSchema = new Schema({
    name: String,
    skill:[{type: String}],
    _toolkits: [{
        type: Schema.Types.ObjectId, 
        ref: 'Toolkit' }],
    _competencies: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Competency' }]
}, { timestamps: true });

// export our module to use in server.js
//export default mongoose.model('Tool', ToolSchema);

module.exports = mongoose.model('Tool', ToolSchema);