const {Pool} = require("pg");
require("dotenv").config({path: 'database.env'});

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});