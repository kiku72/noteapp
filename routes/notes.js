const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes')

router.get('/', notesController.index)

router.get('/new', notesController.new);

router.post('/', notesController.create);

// router.get('/:id/edit', notesController.edit);

// router.put('/:id', notesController.update);

router.delete('/:id', notesController.delete);

router.get('/:id', notesController.show)

module.exports = router;