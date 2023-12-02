const Newcomer = require('../models/Newcomer');

exports.createNewcomer = async (req, res) => {
    try {
        const newNewcomer = await Newcomer.create(req.body);
        res.status(201).json(newNewcomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllNewcomers = async (req, res) => {
    try {
        const newcomers = await Newcomer.find();
        res.status(200).json(newcomers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNewcomerById = async (req, res) => {
    try {
        const newcomer = await Newcomer.findById(req.params.id);
        if (!newcomer) return res.status(404).json({ message: 'Newcomer not found' });
        res.status(200).json(newcomer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateNewcomer = async (req, res) => {
    try {
        const updatedNewcomer = await Newcomer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNewcomer) return res.status(404).json({ message: 'Newcomer not found' });
        res.status(200).json(updatedNewcomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteNewcomer = async (req, res) => {
    try {
        const newcomer = await Newcomer.findByIdAndDelete(req.params.id);
        if (!newcomer) return res.status(404).json({ message: 'Newcomer not found' });
        res.status(200).json({ message: 'Newcomer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
