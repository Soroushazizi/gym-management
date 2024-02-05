const Attendance = require('../models/Attendance');
const {validate, checkRole} = require("../Util");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.attendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).send(attendance);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};