const User = require('../models/User');
const Payment = require('../models/Payment');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.login = async (req, res) => {
    try {
        const member = await User.findOne({ username: req.body.username, role: 'member' });
        if (!member) return res.status(404).send({ error: 'Member not found' });

        const token = jwt.sign({ id: member._id }, secretKey, { expiresIn: '6h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};

exports.payment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};
