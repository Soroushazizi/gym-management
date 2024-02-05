const Payment = require('../models/Payment');
const {validate, checkRole} = require("../Util");

exports.payment =
    async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(500).send({error: 'Server error'});
    }
};
