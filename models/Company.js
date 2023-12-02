const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    location: String,
    industry: { type: String, },
    website: String,
    jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobListing' }],
    // Additional fields as needed
});

module.exports = mongoose.model('Company', companySchema);
