const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    dateReported: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
    resolutionDetails: String,
    adminReview: {
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewedAt: Date,
        actionTaken: String,
        notes: String
    }
    // Additional fields as needed
});

module.exports = mongoose.model('Report', reportSchema);
