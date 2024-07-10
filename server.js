const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Database connection
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// página de registro: http://localhost:5000/register.html.
// página de login: http://localhost:5000/login.html.