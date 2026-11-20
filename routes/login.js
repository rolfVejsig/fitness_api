
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

router.post('/login', async (req, res) => {

    try {

        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({error: 'Username, email and password are required'});
        }

        // Get user from database
        const [results] = await pool.query('CALL get_user_by_login(?)',[login]);

        const user = results[0]?.[0];

        // Check if user exists
        if (!user) {
            return res.status(401).json({error: 'Invalid username, email or password'});
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({error: 'Invalid username, email or password'});
        }

        // Return user information
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email 
                }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({error: 'Internal server error'});
    }

});

module.exports = router;
