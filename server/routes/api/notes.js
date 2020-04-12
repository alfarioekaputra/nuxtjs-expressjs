const { Router } = require('express');
const notesController = require('../../controllers/notes.js')

const router = new Router();

router.get('/', notesController.index);
// router.post('/notes', notesController.add);

module.exports = router;