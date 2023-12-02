const JobListing = require('../models/JobListing');

exports.createJobListing = async (req, res) => {
    try {
        const newJobListing = await JobListing.create(req.body);
        res.status(201).json(newJobListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllJobListings = async (req, res) => {
    try {
        const jobListings = await JobListing.find();
        res.status(200).json(jobListings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobListingById = async (req, res) => {
    try {
        const jobListing = await JobListing.findById(req.params.id);
        if (!jobListing) return res.status(404).json({ message: 'JobListing not found' });
        res.status(200).json(jobListing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateJobListing = async (req, res) => {
    try {
        const updatedJobListing = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJobListing) return res.status(404).json({ message: 'JobListing not found' });
        res.status(200).json(updatedJobListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteJobListing = async (req, res) => {
    try {
        const jobListing = await JobListing.findByIdAndDelete(req.params.id);
        if (!jobListing) return res.status(404).json({ message: 'JobListing not found' });
        res.status(200).json({ message: 'JobListing deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
