const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
    try {
        const newCampaign = await Campaign.create(req.body);
        res.status(201).json(newCampaign);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('createdBy', 'name email');
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCampaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json(updatedCampaign);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json({ message: 'Campaign deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
