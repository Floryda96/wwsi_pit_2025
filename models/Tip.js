const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'URL is required'],
        match: [/^https?:\/\/.+/, 'Please enter a valid URL starting with http:// or https://']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    email: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['new', 'processed', 'rejected'],
        default: 'new'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tip', tipSchema, 'Tips');
