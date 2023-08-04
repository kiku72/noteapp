const express = require('express');
const router = express.Router();
const bookmarksController = require('../controllers/bookmarks')

router.get('/', bookmarksController.index);

module.exports = router;