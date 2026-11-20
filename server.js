
const express = require('express');

const app = express();
const PORT = 3000;
const loginRoutes = require('./routes/login');

app.use(express.json());

// routes
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
    res.json({message: 'fitness API is running'});
});

// start server
app.listen(PORT, () => {console.log(`server running on port ${PORT}`);});
