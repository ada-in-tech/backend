const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startDate: Date,
    endDate: Date,
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner', },
    category: { String, },
    image: String,
    // Additional fields as needed
});

module.exports = mongoose.model('Course', courseSchema);
