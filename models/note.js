const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema ({
    title: String,
    content: String,
    createDate: String,
    updateDate: String
}, {
    timestamps: true
})

const categoriesSchema = new Schema ({
    title: String,
    
})

module.exports = mongoose.model('Note', notesSchema)