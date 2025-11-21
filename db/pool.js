const { Pool } = require('pg');



module.exports = new Pool({
    connectionString: 'postgresql://hunter:Ellody2019@localhost:5432/members_message'
});