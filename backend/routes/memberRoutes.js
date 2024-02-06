const express = require('express');
const memberController = require('../controllers/memberController');
const {checkRole} = require("../Util");
const router = express.Router();

router.post('/payment/:id', checkRole('member'), memberController.payment);
router.get('/member', memberController.showMembers);

module.exports = router;
