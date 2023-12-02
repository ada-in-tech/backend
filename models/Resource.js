const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['article', 'video', 'tutorial', 'ebook', 'other'], default: 'article' },
    link: String,
    description: String,
    author: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' },
    image: String,
    // Additional fields as needed
});

module.exports = mongoose.model('Resource', resourceSchema);
