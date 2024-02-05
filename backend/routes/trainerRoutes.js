const express = require('express');
const trainerController = require('../controllers/trainerController');
const {checkRole} = require("../Util");
const router = express.Router();

router.post('/login', trainerController.login);
router.post('/attendance', checkRole('trainer'), trainerController.attendance);

module.exports = router;
