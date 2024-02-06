const mongoose = require('mongoose');
const User = require("./User");

const TrainerSchema = new mongoose.Schema({
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
    shiftFrom: {
        type: Number,
        required: true
    },
    shiftTo: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const Trainer = User.discriminator('Trainer', TrainerSchema);

module.exports = Trainer
