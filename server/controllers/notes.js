const { getAll } = require('../models/notes.js');

async function index(req, res) {
    const notes = await getAll();
    res.json( {notes: notes });
}

// function add(req, res) {
//     const { name } = req.params;
//     res.json({text: `Halo ${name}`});
// }

module.exports = {
    index: index,
    // add: add
}