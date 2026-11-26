
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

router.post('/sign_up', async (req, res) => {

    const {username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({error: 'All fields are required'});
    }

    try {

        // Check if username or email already exists
        const [existingUsers] = await pool.query('SELECT user_id FROM users WHERE username = ? OR email = ?',[username, email]);

        if (existingUsers.length > 0) {return res.status(409).json({error: 'Username or email already exists'});}

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const [results] = await pool.query('CALL create_user(?, ?, ?)',[ username, email, passwordHash]);

        const userId = results[0][0].id;

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: userId,
                username,
                email
            }
        });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {return res.status(409).json({error: 'Username or email already exists'});}

        res.status(500).json({error: 'Internal server error'});
    }

});

module.exports = router;
