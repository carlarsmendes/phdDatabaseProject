// model/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ActivitySchema = new Schema({
    name: String,
    tool:[{type: mongoose.Schema.Types.ObjectId, ref: 'Tool'}],
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Activity', ActivitySchema);