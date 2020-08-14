// model/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ToolkitSchema = new Schema({
    name: String,
    image: String,
    author: String,
    version:String,
    //phase:[{type: mongoose.Schema.Types.ObjectId, ref: 'Phase'}],
    category: String,
    url_link:String,
}, { timestamps: true });

// export our module to use in server.js
//export default mongoose.model('Toolkit', ToolkitSchema);
module.exports = mongoose.model('Toolkit', ToolkitSchema);