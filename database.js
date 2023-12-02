const mongoose = require('mongoose');

const mongoURI = process.env.DB_URI;


mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));
