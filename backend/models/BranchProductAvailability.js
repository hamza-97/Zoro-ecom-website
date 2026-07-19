const mongoose = require('mongoose');

const branchProductAvailabilitySchema = new mongoose.Schema({
    branch_name: {
        type: String,
        required: true,
        trim: true
    },
    product_id: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

branchProductAvailabilitySchema.index({ branch_name: 1, product_id: 1 }, { unique: true });

module.exports = mongoose.model('BranchProductAvailability', branchProductAvailabilitySchema);
