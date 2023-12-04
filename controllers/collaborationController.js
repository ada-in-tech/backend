const Collaboration = require('../models/Collaboration');

exports.createCollaboration = async (req, res) => {
    try {
        const newCollaboration = await Collaboration.create(req.body);
        res.status(201).json(newCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllCollaborations = async (req, res) => {
    try {
        const collaborations = await Collaboration.find();
        res.status(200).json(collaborations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCollaborationById = async (req, res) => {
    try {
        const collaboration = await Collaboration.findById(req.params.id);
        if (!collaboration) return res.status(404).json({ message: 'Collaboration not found' });
        res.status(200).json(collaboration);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCollaboration = async (req, res) => {
    try {
        const updatedCollaboration = await Collaboration.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCollaboration) return res.status(404).json({ message: 'Collaboration not found' });
        res.status(200).json(updatedCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCollaboration = async (req, res) => {
    try {
        const collaboration = await Collaboration.findByIdAndDelete(req.params.id);
        if (!collaboration) return res.status(404).json({ message: 'Collaboration not found' });
        res.status(200).json({ message: 'Collaboration deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
