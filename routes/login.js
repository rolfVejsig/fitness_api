
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

router.post('/login', async (req, res) => {

    const { login, password } = req.body;

    if (!login || !password) { return res.status(400).json({error: 'Username or email and password are required'}); }

    const [results] = await pool.query('CALL get_user_by_login(?)', [login]);
    const user = results[0]?.[0];

    if (!user) { return res.status(404).json({error: 'username or email not found'}); }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) { return res.status(401).json({error: 'incorrect password'}); }

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    });

});

module.exports = router;
