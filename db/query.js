const pool = require('./pool.js')

async function newUserInsert(user) {
    const query = `
        INSERT INTO users (username, password_hash, first_name, last_name, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

    const values = [user.username, user.password, user.first_name, user.last_name, user.email];

    const {rows} = await pool.query(query, values);
    return rows[0];
}

module.exports = {newUserInsert};