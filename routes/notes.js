const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, notesController.index)

router.get('/new', ensureLoggedIn, notesController.new);

router.post('/', ensureLoggedIn, notesController.create);

router.get('/:id/edit', ensureLoggedIn, notesController.edit);

router.put('/:id', ensureLoggedIn, notesController.update);

router.delete('/:id', ensureLoggedIn, notesController.delete);

router.get('/:id', ensureLoggedIn, notesController.show)

module.exports = router;