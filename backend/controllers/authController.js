const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.login = async (req, res) => {
    try {
        const member = await User.findOne({ username: req.body.username });
        if (!member) return res.status(404).send({ error: 'Member not found' });

        const token = jwt.sign({ id: member._id }, secretKey, { expiresIn: '6h' });
        res.status(200).send({ token : token , role : member.role });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};