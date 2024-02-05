const mongoose = require('mongoose');
const User = require("./User");

const TrainerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    }
});

const Trainer = User.discriminator('Trainer', TrainerSchema);

module.exports = Trainer
