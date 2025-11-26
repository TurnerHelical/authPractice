const pool = require('./pool.js')

async function newUserInsert(user) {
    const query = `
        INSERT INTO users (username, password_hash, first_name, last_name, email, admin)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;

    const values = [user.username, user.password, user.first_name, user.last_name, user.email, user.admin];

    const {rows} = await pool.query(query, values);
    return rows[0];
};

async function getMessages(page_number) {
    const query = `
    SELECT m.id, m.user_id, m.text, m.created_at, u.username
    FROM messages AS m
    JOIN users AS u
        ON m.user_id = u.id
    ORDER BY m.created_at DESC
    LIMIT 5
    OFFSET 5 * ($1 - 1)
    `;

    const pageNumber = [page_number];
    const {rows} = await pool.query(query, pageNumber);
    return rows
};

async function newMessage(message) {
    const query = `
        INSERT INTO messages (user_id, text)
        VALUES ($1, $2)
        `;
    const values = [message.user_id, message.text];

    await pool.query(query, values);
};

async function deleteMessage(id) {
    const query = 'DELETE FROM messages WHERE id = $1'

    const value = [id];

    await pool.query(query,value)
};

async function updateMessage(id ,text) {
    const query = 'UPDATE messages SET text = $1 WHERE id = $2';

    const value = [text, id];

    await pool.query(query,value);
    return
};

module.exports = {newUserInsert, getMessages, newMessage, deleteMessage, updateMessage};