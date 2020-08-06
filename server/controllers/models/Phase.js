// Should no longer be of use
/*
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const PhaseSchema = new Schema({
    name: String,
    phase:[{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Phase', PhaseSchema);*/