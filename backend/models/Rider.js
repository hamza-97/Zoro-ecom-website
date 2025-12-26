const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
        enum: ['bike', 'car', 'motorcycle'],
        default: 'bike'
    },
    vehicle_number: {
        type: String,
        default: ''
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_available: {
        type: Boolean,
        default: true
    },
    push_subscriptions: [{
        endpoint: String,
        keys: {
            p256dh: String,
            auth: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Rider', riderSchema);



