const { User, Admin, Member, Trainer } = require('../models/User');
const { checkRole, validate } = require('../util');
const { validationResult } = require('express-validator');

exports.addMember = [
    validate('addMember'),
    checkRole('admin'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const newMember = new Member(req.body);
        await newMember.save();
        res.status(201).send(newMember);
    }
];

exports.deleteMember = [
    validate('deleteMember'),
    checkRole('admin'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const member = await Member.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).send();
        res.status(200).send(member);
    }
];

exports.addTrainer = [
    validate('addTrainer'),
    checkRole('admin'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const newTrainer = new Trainer(req.body);
        await newTrainer.save();
        res.status(201).send(newTrainer);
    }
];

exports.showTrainers = [
    checkRole('admin'),
    async (req, res) => {
        try {
            const filters = {};
            if (req.query.name) {
                filters.name = req.query.name;
            }
            if (req.query.id) {
                filters._id = req.query.id;
            }
            // Add other filters as needed

            const trainers = await Trainer.find(filters);
            res.status(200).send(trainers);
        } catch (error) {
            res.status(500).send({ error: 'Server error' });
        }
    }
];

exports.showMembers = [
    checkRole('admin'),
    async (req, res) => {
        try {
            const filters = {};
            if (req.query.name) {
                filters.name = req.query.name;
            }
            if (req.query.id) {
                filters._id = req.query.id;
            }
            // Add other filters as needed

            const members = await Member.find(filters);
            res.status(200).send(members);
        } catch (error) {
            res.status(500).send({ error: 'Server error' });
        }
    }
];

exports.deleteTrainer = [
    validate('deleteTrainer'),
    checkRole('admin'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) return res.status(404).send();
        res.status(200).send(trainer);
    }
];

exports.modifyMemberData = [
    validate('modifyMemberData'),
    checkRole('admin'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const updates = Object.keys(req.body);
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send();
        updates.forEach((update) => member[update] = req.body[update]);
        await member.save();
        res.send(member);
    }
];

exports.modifyTrainerShifts = [
    validate('modifyTrainerShifts'),
    checkRole('admin'),
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
];
