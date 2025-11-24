const pool = require('./pool.js')

async function newUserInsert(user) {
    const query = `
        INSERT INTO users (username, password_hash, first_name, last_name, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

    const values = [user.username, user.password, user.first_name, user.last_name, user.email];

    const {rows} = await pool.query(query, values);
    return rows[0];
};

async function getMessages(page_number) {
    const query = `
    SELECT m.id, m.text, m.created_at, u.username
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
}

module.exports = {newUserInsert, getMessages};