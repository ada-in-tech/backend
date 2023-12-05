const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: String,
    targetDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' },
    tags: [String],
    targetAudience: String,
    budget: Number,
    image: String,
    // Additional fields as needed
});

module.exports = mongoose.model('Campaign', campaignSchema);
