const mongoose = require('mongoose');
const User = require("./User");

const MembershipSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    payment: {
        type: Number,
        required: false,
        default: 0
    }
});

const Membership = User.discriminator('Membership', MembershipSchema);
module.exports = Membership