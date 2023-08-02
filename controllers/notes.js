const Note = require('../models/note');

async function index(req, res) {
    try {
        // Find the notes where 'user' is the logged-in user's id
        const notes = await Note.find({user: req.user._id});
        res.render('notes/dashboard', {notes: notes});
    } catch (err) {
        console.log(err);
        res.send("Error while fetching notes");
    }
}

async function show(req,res) {
    userHasAccess(req,res,function() {
        Note.findById(req.params.id, function(err, foundNote) {
            if (err) {
                console.log(err);
                res.redirect('/notes')
            } else {
                res.render('notes/show', {title: 'Note', note:foundNote});
            }
        })
    })
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
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
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
    userHasAccess(req, res, function() {
        Note.findOne({_id: req.params.id}, function(err, foundNote) {
            if(err) {
                console.log(err);
                res.redirect('/notes');
            } else {
                res.render('notes/edit', {title: 'Edit Note', note: foundNote});
            }
        });
    });
}

async function update (req, res) {
    try {
        await userHasAccess(req, res, async() => {
            const note = await Note.findOneAndUpdate({_id: req.params.id}, req.body)
            res.redirect(`/notes`)
        });
    } catch (err) {
        console.log(err)
        res.redirect(`/notes/${note._id}/edit`)
    }
}

async function deleteNote(req, res) {
    try {
        await userHasAccess(req, res, async() => {
            await Note.findByIdAndDelete(req.params.id);
            res.redirect('/notes');
        })
    } catch (err) {
        console.log(err);
        res.send('Error while trying to delete the note');
    }
}

async function userHasAccess(req, res, next) {
    try {
        const foundNote = await Note.findById(req.params.id);
        if(foundNote.user.equals(req.user._id)) {
            next();
        } else {
            res.redirect("back");
        }
    } catch (err) {
        res.redirect("back");
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