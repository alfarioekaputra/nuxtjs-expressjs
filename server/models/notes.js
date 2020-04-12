const config = require('../knexfile.js')[process.env.NODE_ENV || 'development']
const db = require('knex')(config);

function getAll() {
    try{
        return db.select().from('note');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getAll: getAll
}