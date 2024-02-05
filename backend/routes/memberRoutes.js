const express = require('express');
const memberController = require('../controllers/memberController');
const {checkRole} = require("../Util");
const router = express.Router();

router.post('/login', memberController.login);
router.post('/payment', checkRole('member'), memberController.payment);

module.exports = router;
