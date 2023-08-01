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

async function create(req,res) {
    // For timestamp formatting (month dd yyyy)
    function formatDate (date) {
        return date.toDateString();
    }
    try {
        // Create a new note 
        const note = await Note.create(req.body);
        
        // formatDate fn requires timestamp properties(str) as dates 
        const strToDate = (date) => {
            return new Date(date);
        }
        // Formatting timestamp properties
        const createDate = formatDate(strToDate(note.createdAt));
        const updateDate = formatDate(strToDate(note.updatedAt));
        // Adding formatted dates to note doc
        note.createDate = createDate;
        note.updateDate = updateDate;
        // Save updated note doc and wait for the operation to complete
        await note.save();
        // Redirect after the save operation completes
        res.redirect('/notes');
    } catch (err) {
        console.log(err);
        res.render('notes/new', { errorMsg: err.message });
    }
}

async function edit (req, res) {
    try {
        const note = await Note.findOne({_id: req.params.id});
        if (!note) return res.redirect('/notes');
        res.render('notes/edit', {title: 'Edit Note', note});
    } catch (err) {
        console.log(err);
        res.redirect('/notes');
    }
}

async function update (req, res) {
    try {
        const note = await Note.findOneAndUpdate({_id: req.params.id}, req.body)
        res.redirect(`/notes/${note._id}/edit`)
    } catch (err) {
        console.log(err)
        res.redirect(`/notes/${note._id}`)
    }
}

async function deleteNote(req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/notes');
    } catch (err) {
        console.log(err);
        res.send('Error while trying to delete the note');
    }
}

module.exports = {
    index,
    show,
    new: newNote,
    create,
    delete: deleteNote,
    edit,
    update
}