const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

// Virtual for identifying "Hot" or "Cold" status
dealSchema.virtual('status').get(function () {
    if (this.score > 10) return 'hot';
    if (this.score < -10) return 'cold';
    return 'neutral';
});

module.exports = mongoose.model('Deal', dealSchema, 'Deals');
