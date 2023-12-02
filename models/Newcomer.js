const mongoose = require('mongoose');

const newcomerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    goals: [String],
    challenges: [String],
    // Add other fields as needed
});

module.exports = mongoose.model('Newcomer', newcomerSchema);
