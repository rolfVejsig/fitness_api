const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '10.130.56.24',
    user: 'fitnessadmin',
    password: 'fitnessDB2026',
    database: 'fitness_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {pool};