const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'userDB'
});

module.exports = pool.promise();