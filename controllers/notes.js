const Note = require('../models/note');

async function index(req,res) {
    const notes = await Note.find({});
    res.render('notes/dashboard', { title: 'Notes', notes });
}

async function show(req,res) {
    const note = await Note.findById(req.params.id)
    console.log(note);
    res.render('notes/show', {title: 'Note', note})
}

async function newNote(req,res) {
    res.render('notes/new', {
        title: 'New Note',
        errorMsg: 'failed'
});
}

// async function edit

// async function update

async function deleteNote(req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/notes');
    } catch (err) {
        console.log(err);
        res.send('Error while trying to delete the note');
    }
}

async function create(req,res) {
    console.log(req.body.content); 
    try {
        const note = await Note.create(req.body); // Store note in a variable
    } catch (err) {
        console.log(err);
        res.render('notes/new', { errorMsg: err.message });
    }
    res.redirect('/notes');
}

module.exports = {
    index,
    show,
    new: newNote,
    create,
    delete: deleteNote
}