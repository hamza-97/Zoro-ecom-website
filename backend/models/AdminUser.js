const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true,
        enum: ['gulberg', 'jt', 'islamabad', 'super_admin'],
        default: 'super_admin'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminUser', adminUserSchema);


