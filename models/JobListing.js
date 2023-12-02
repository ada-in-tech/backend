const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, },
    description: { type: String, required: true },
    requirements: [String],
    location: String,
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
    applicationDeadline: Date,
    // Additional fields as needed
});

module.exports = mongoose.model('JobListing', jobListingSchema);
