const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    onCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    rating: Number,
    // Additional fields as needed
});

module.exports = mongoose.model('Feedback', feedbackSchema);
