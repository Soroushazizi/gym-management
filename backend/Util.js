const jwt = require("jsonwebtoken");
const {body, validationResult} = require('express-validator');

exports.checkRole = (role) => {
    return function(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, secretKey);
            if (decoded.role !== role) {
                return res.status(403).send({error: 'Forbidden'});
            }
            next();
        } catch (error) {
            res.status(500).send({error: 'Server error'});
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

