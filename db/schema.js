const {Client} = require('pg')

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username TEXT NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name TEXT,
        last_name TEXT,
        email VARCHAR(254) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_messages_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
        );
`;

async function main() {
    const client = new Client({
        connectionString: 'postgresql://hunter:Ellody2019@localhost:5432/members_message'
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
};

main();
