const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema ({
    title: String,
    content: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', notesSchema)