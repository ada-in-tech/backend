const Workshop = require('../models/Workshop');

exports.createWorkshop = async (req, res) => {
    try {
        const newWorkshop = await Workshop.create(req.body);
        res.status(201).json(newWorkshop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find();
        res.status(200).json(workshops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWorkshopById = async (req, res) => {
    try {
        const workshop = await Workshop.findById(req.params.id);
        if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
        res.status(200).json(workshop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateWorkshop = async (req, res) => {
    try {
        const updatedWorkshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkshop) return res.status(404).json({ message: 'Workshop not found' });
        res.status(200).json(updatedWorkshop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteWorkshop = async (req, res) => {
    try {
        const workshop = await Workshop.findByIdAndDelete(req.params.id);
        if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
        res.status(200).json({ message: 'Workshop deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
