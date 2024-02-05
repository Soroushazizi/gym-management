const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    payment: {
        type: Number,
        required: true
    }
});

const Membership = mongoose.model('Membership', MembershipSchema);

module.exports = Membership