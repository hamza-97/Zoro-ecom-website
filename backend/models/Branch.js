const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    open_hour: {
        type: Number,
        required: true,
        default: 12 // 12pm
    },
    close_hour: {
        type: Number,
        required: true,
        default: 1.75 // 1:45am (represented as 1.75)
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);
