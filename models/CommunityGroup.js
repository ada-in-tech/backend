const mongoose = require('mongoose');

const communityGroupSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    focusArea: String,
    website: String,
    location: String,
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    // Additional fields as needed
});

module.exports = mongoose.model('CommunityGroup', communityGroupSchema);
