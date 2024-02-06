const Payment = require('../models/Payment');
const {validate, checkRole} = require("../Util");
const Membership = require("../models/Membership");
const Trainer = require("../models/Trainer");

exports.payment =
    async (req, res) => {
    try {
        const member = req.user
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).send({ error: 'Trainer not found' });

        const payment = new Payment(
            {
                amount: trainer.salary,
                date : Date.now(),
                membership : member._id,
                trainer : trainer._id,
            }
        );
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(500).send({error: 'Server error'});
    }
};

exports.showMembers =
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

            const members = await Membership.find(filters);
            res.status(200).send(members);
        } catch (error) {
            res.status(500).send({ error: 'Server error' });
        }
    }
;
