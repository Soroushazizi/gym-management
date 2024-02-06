const Attendance = require('../models/Attendance');
const {validate, checkRole} = require("../Util");
const User = require('../models/User');
const Trainer = require("../models/Trainer");
const Membership = require("../models/Membership");

exports.attendance = async (req, res) => {
    try {
        const trainer = req.user;
        const member = await Membership.findById(req.params.id);
        if (!member) return res.status(404).send({ error: 'Member not found' });
        const attendance = new Attendance(
            {
                attended: req.body.attended,
                date : Date.now(),
                member : member._id,
                trainer : trainer._id,
            }
        );
        await attendance.save();
        res.status(201).send(attendance);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
};

exports.showTrainers =
    async (req, res) => {
        try {
            const filters = {};

            filters.role = 'trainer';

            if (req.query.name) {
                filters.name = req.query.name;
            }
            if (req.query.id) {
                filters._id = req.query.id;
            }
            if (req.query.salary) {
                filters.salary = req.query.salary;
            }
            // Add other filters as needed

            const trainers = await Trainer.find(filters);
            res.status(200).send(trainers);
        } catch (error) {
            res.status(500).send({ error: 'Server error' });
        }
    }
;