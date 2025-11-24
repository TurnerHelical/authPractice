const db = require('../db/query.js');

async function boardGet(req, res, next) {
    try {
        const messages = await db.getMessages(1);
        res.render('board', {
            title:'Message Board',
            stylesheet:'/styles/board.css',
            messages,
        });
    } catch (err) {
        next(err);
    };

};

module.exports = {boardGet}