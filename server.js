
const express = require('express');

const app = express();
const PORT = 3000;
const loginRoutes = require('./routes/login');
const signUpRoutes = require('./routes/sign_up');
const workoutsRoutes = require('./routes/workouts');

app.use(express.json());

// routes
app.use('/api', loginRoutes);
app.use('/api', signUpRoutes);
app.use('/api', workoutsRoutes);

app.get('/', (req, res) => {
    res.json({message: 'fitness API is running'});
});

// start server
app.listen(PORT, () => {console.log(`server running on port ${PORT}`);});
