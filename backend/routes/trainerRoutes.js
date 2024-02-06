const express = require('express');
const trainerController = require('../controllers/trainerController');
const {checkRole, validate} = require("../Util");
const router = express.Router();

router.post('/attendance/:id', checkRole('trainer'), trainerController.attendance);
router.get('/trainer', trainerController.showTrainers);

module.exports = router;
