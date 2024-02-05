const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {validate} = require("../Util");
const {validationResult} = require("express-validator");
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.login = [
    validate('login'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) return res.status(404).send({error: 'User not found'});

            const token = jwt.sign({id: user._id, role: user.role}, secretKey, {expiresIn: '6h'});
            res.status(200).send({token});
        } catch (error) {
            res.status(500).send({error: 'Server error'});
        }
    }
];