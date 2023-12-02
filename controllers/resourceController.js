const Resource = require('../models/Resource');

exports.createResource = async (req, res) => {
    try {
        const newResource = await Resource.create(req.body);
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json(resource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json(updatedResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ message: 'Resource deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
