const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    presenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    date: Date,
    location: String,
    image: String,
    // Additional fields as needed
});

module.exports = mongoose.model('Workshop', workshopSchema);
