const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        default: ''
    },
    customer_phone: {
        type: String,
        required: true
    },
    customer_address: {
        type: String,
        default: ''
    },
    branch: {
        type: String,
        required: true
    },
    order_type: {
        type: String,
        required: true,
        enum: ['delivery', 'pickup']
    },
    items: [{
        id: Number,
        name: String,
        category: String,
        price: Number,
        image: String,
        description: String,
        quantity: Number,
        size: String,
        addons: [{
            name: String,
            price: Number
        }],
        total: Number
    }],
    subtotal: {
        type: Number,
        required: true
    },
    delivery_fee: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'ordered',
        enum: ['ordered', 'confirmed', 'awaiting_rider', 'in_kitchen', 'rider_on_way', 'delivered', 'pending', 'preparing', 'ready', 'completed', 'cancelled']
    },
    rider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
        default: null
    },
    rider_name: {
        type: String,
        default: ''
    },
    accepted_at: {
        type: Date,
        default: null
    },
    delivery_location: {
        latitude: {
            type: Number,
            default: null
        },
        longitude: {
            type: Number,
            default: null
        },
        accuracy: {
            type: Number,
            default: null
        },
        timestamp: {
            type: Date,
            default: null
        }
    },
    payment_method: {
        type: String,
        default: 'cash'
    },
    payment_status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'paid', 'refunded']
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

