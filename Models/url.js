const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full: {  // Changed Full to full to be consistent
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

    module.exports = mongoose.model('ShortUrl', shortUrlSchema); // ShortUrl to keep naming consistent
