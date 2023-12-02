const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    experience: String,
    areasOfExpertise: [String],
    currentRole: String,
    industry: String,
    certifications: [String],
    // Add other fields as needed
});

module.exports = mongoose.model('Professional', professionalSchema);
