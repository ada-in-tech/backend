const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    dateReported: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
    resolutionDetails: String,
    // Additional fields as needed
});

module.exports = mongoose.model('Report', reportSchema);
