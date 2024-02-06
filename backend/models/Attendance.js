const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership',
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    attended: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
