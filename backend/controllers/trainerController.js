const User = require('../models/User');
const Attendance = require('../models/Attendance');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.login = async (req, res) => {
    try {
        const trainer = await User.findOne({ username: req.body.username, role: 'trainer' });
        if (!trainer) return res.status(404).send({ error: 'Trainer not found' });

        const token = jwt.sign({ id: trainer._id }, secretKey, { expiresIn: '6h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};

exports.attendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).send(attendance);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};