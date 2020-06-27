const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    surname: String,
    age: Number,
    biography: String,
    familyId: String

});

module.exports = mongoose.model('Person', personSchema);