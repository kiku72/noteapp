const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Bookmark', bookmarkSchema)