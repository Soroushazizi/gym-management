const express = require('express');
const trainerController = require('../controllers/trainerController');
const {checkRole, validate} = require("../Util");
const router = express.Router();

router.post('/attendance', checkRole('trainer'), trainerController.attendance);

module.exports = router;
