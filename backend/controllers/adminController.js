const User = require('../models/User');
const {checkRole, validate} = require('../util');
const {validationResult} = require('express-validator');
const Trainer = require("../models/Trainer");
const Membership = require("../models/Membership");

exports.addMember =
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const body = req.body;
        body.role = 'member';
        // Check if a user with the same username already exists
        const existingUser = await User.findOne({username: body.username});
        if (existingUser) {
            return res.status(400).send({msg: 'Username already exists'});
        }
        const newMember = new Membership(req.body);
        await newMember.save();
        res.status(201).send(newMember);
    }
;

exports.deleteMember =
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const member = await Membership.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).send();
        res.status(200).send(member);
    }
;

exports.addTrainer =
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const body = req.body;
        body.role = 'trainer';
        // Check if a user with the same username already exists
        const existingUser = await User.findOne({username: body.username});
        if (existingUser) {
            return res.status(400).send({msg: 'Username already exists'});
        }
        const newTrainer = new Trainer({
            firstName: body.firstName,
            lastName: body.lastName,
            phoneNumber: body.phone,
            shiftFrom: body.shiftFrom,
            shiftTo: body.shiftTo,
            salary: body.salary,
            username: body.username,
            password: body.password,
            role: body.role
        });
        await newTrainer.save();
        res.status(201).send({msg: 'new Trainer added'});
    }
;

exports.deleteTrainer =
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) return res.status(404).send();
        res.status(200).send(trainer);
    }
;

exports.modifyMemberData =
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const updates = Object.keys(req.body);
        const member = await Membership.findById(req.params.id);
        if (!member) return res.status(404).send();
        updates.forEach((update) => member[update] = req.body[update]);
        await member.save();
        res.send(member);
    };

exports.modifyTrainerShifts =
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const updates = Object.keys(req.body);
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).send();
        updates.forEach((update) => trainer[update] = req.body[update]);
        await trainer.save();
        res.send(trainer);
    }
;
