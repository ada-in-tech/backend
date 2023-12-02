const Professional = require('../models/Professional');

exports.createProfessional = async (req, res) => {
    try {
        const newProfessional = await Professional.create(req.body);
        res.status(201).json(newProfessional);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllProfessionals = async (req, res) => {
    try {
        const professionals = await Professional.find();
        res.status(200).json(professionals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfessionalById = async (req, res) => {
    try {
        const professional = await Professional.findById(req.params.id);
        if (!professional) return res.status(404).json({ message: 'Professional not found' });
        res.status(200).json(professional);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfessional = async (req, res) => {
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfessional) return res.status(404).json({ message: 'Professional not found' });
        res.status(200).json(updatedProfessional);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProfessional = async (req, res) => {
    try {
        const professional = await Professional.findByIdAndDelete(req.params.id);
        if (!professional) return res.status(404).json({ message: 'Professional not found' });
        res.status(200).json({ message: 'Professional deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
