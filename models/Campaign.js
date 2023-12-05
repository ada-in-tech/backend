const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' },
    tags: [String],
    targetAudience: String,
    budget: Number,
    imageUrl: String,
    // Additional fields as needed
});

module.exports = mongoose.model('Campaign', campaignSchema);
