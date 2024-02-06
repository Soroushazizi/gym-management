const jwt = require("jsonwebtoken");
const {body, validationResult} = require('express-validator');
const User = require("./models/User");
const secretKey = 'your_secret_key'; // Replace with your secret key

exports.checkRole = (role) => {
    return async function (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, secretKey);
            const user = await User.findById(decoded.id);
            if (user.role !== role) {
                return res.status(403).send({error: 'Forbidden'});
            }
            req.user = user; // Attach the user to the req object
            next();
        } catch (error) {
            res.status(401).send({error: 'UnAuthorized'});
        }
    }
}

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('username', 'Username is required').exists(),
                body('password', 'Password is required').exists()
            ]
        }
        case 'addMember': {
            return [
                body('username', 'Username is required').exists(),
                body('password', 'Password is required').exists(),
                // Add other fields as needed
            ]
        }
        case 'deleteMember': {
            return [
                body('id', 'Member ID is required').exists(),
            ]
        }
        case 'addTrainer': {
            return [
                body('username', 'Username is required').exists(),
                body('password', 'Password is required').exists(),
                // Add other fields as needed
            ]
        }
        case 'deleteTrainer': {
            return [
                body('id', 'Trainer ID is required').exists(),
            ]
        }
        case 'modifyMemberData': {
            return [
                body('id', 'Member ID is required').exists(),
                // Add other fields as needed
            ]
        }
        case 'modifyTrainerShifts': {
            return [
                body('id', 'Trainer ID is required').exists(),
                // Add other fields as needed
            ]
        }
    }
}

