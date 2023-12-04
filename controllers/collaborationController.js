const Collaboration = require('../models/Collaboration');

exports.createCollaboration = async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        // Check if a collaboration already exists with the same sender and receiver
        const existingCollaboration = await Collaboration.findOne({ sender, receiver });
        if (existingCollaboration) {
            // Collaboration already exists, so don't create a new one
            return res.status(200).json({ message: 'Collaboration already exists', collaboration: existingCollaboration });
        }

        // If the collaboration doesn't exist, create a new one
        const newCollaboration = await Collaboration.create({ sender, receiver });
        res.status(201).json(newCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllCollaborations = async (req, res) => {
    try {
        const collaborations = await Collaboration.find()
            .populate('sender', 'profilePicture name email bio skills interests linkedIn github role')
            .populate('receiver', 'profilePicture name email bio skills interests linkedIn github role');
        res.status(200).json(collaborations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserCollaborations = async (req, res) => {
    try {
        const userId = req.params.userId;
        const collaborations = await Collaboration.find({
            $or: [{ sender: userId }, { receiver: userId }]
        })
            .populate('sender', 'profilePicture name email bio skills interests linkedIn github role')
            .populate('receiver', 'profilePicture name email bio skills interests linkedIn github role');
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
