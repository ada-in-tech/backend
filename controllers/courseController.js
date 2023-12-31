const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const existingCourse = await Course.findOne({ title: req.body.title });
        if (existingCourse) {
            return res.status(400).json({ message: 'A course with this title already exists.' });
        }

        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name email');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
