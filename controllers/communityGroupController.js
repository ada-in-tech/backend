const CommunityGroup = require('../models/CommunityGroup');

exports.createCommunityGroup = async (req, res) => {
    try {
        const newCommunityGroup = await CommunityGroup.create(req.body);
        res.status(201).json(newCommunityGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllCommunityGroups = async (req, res) => {
    try {
        const communityGroups = await CommunityGroup.find();
        res.status(200).json(communityGroups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommunityGroupById = async (req, res) => {
    try {
        const communityGroup = await CommunityGroup.findById(req.params.id);
        if (!communityGroup) return res.status(404).json({ message: 'CommunityGroup not found' });
        res.status(200).json(communityGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCommunityGroup = async (req, res) => {
    try {
        const updatedCommunityGroup = await CommunityGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCommunityGroup) return res.status(404).json({ message: 'CommunityGroup not found' });
        res.status(200).json(updatedCommunityGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCommunityGroup = async (req, res) => {
    try {
        const communityGroup = await CommunityGroup.findByIdAndDelete(req.params.id);
        if (!communityGroup) return res.status(404).json({ message: 'CommunityGroup not found' });
        res.status(200).json({ message: 'CommunityGroup deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
