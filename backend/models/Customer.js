const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        default: '',
        lowercase: true
    },
    address: {
        type: String,
        default: ''
    },
    total_orders: {
        type: Number,
        default: 0
    },
    total_spent: {
        type: Number,
        default: 0
    },
    first_order_date: {
        type: Date,
        default: Date.now
    },
    last_order_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);


