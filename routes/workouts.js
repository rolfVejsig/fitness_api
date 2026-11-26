
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

router.get('/workouts', async (req, res) => {

    try {
        const [results] = await pool.query('CALL get_workouts()');
        const workouts = results[0];
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;