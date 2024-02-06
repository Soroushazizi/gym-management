const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership',
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
