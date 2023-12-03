const Report = require('../models/Report');
const transporter = require('../emailService');


exports.createReport = async (req, res) => {
    try {
        const newReport = await Report.create(req.body);
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.status(200).json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
        res.status(200).json(updatedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.status(200).json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.adminReviewReport = async (req, res) => {
    try {
        const { adminActions } = req.body; // Destructure admin actions from the request body
        const report = await Report.findById(req.params.id).populate('user');


        if (!report) return res.status(404).json({ message: 'Report not found' });

        // Save admin review actions
        report.adminReview = adminActions;
        await report.save();

        // After report is reviewed, send an email
        let mailOptions = {
            from: '"ADA IN TECH" adaobiamudo@gmail.com',
            to: report.user.email, // Assuming `report` has a `user` object with an `email` field
            subject: 'Your report has been reviewed',
            text: `Hi ${report.user.name}, your report has been reviewed. Here is the outcome: ${adminActions.notes}`,
            // Add HTML as needed
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: %s', info.messageId);
            }
        });
        res.status(200).json(report);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};