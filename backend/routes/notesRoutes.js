const express = require('express');
const { getNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/notesController');
const { validateToken } = require('../middleware/validateTokenHandler');
const router = express.Router()

router.use(validateToken)
router.route('/').get(getNotes).post(createNote)
router.route('/:noteId').get(getNote).put(updateNote).delete(deleteNote)

module.exports = router;