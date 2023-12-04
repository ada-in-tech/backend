const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // Add additional fields as required, such as message content, status, etc.
});

const Collaboration = mongoose.model('Collaboration', collaborationSchema);

module.exports = Collaboration;
