const express = require('express');
const adminController = require('../controllers/adminController');
const {checkRole, validate} = require("../Util");
const router = express.Router();

router.post('/member', checkRole('admin'), adminController.addMember);
router.delete('/member/:id', checkRole('admin'), adminController.deleteMember);
router.post('/trainer',  checkRole('admin'), adminController.addTrainer);
router.delete('/trainer/:id', checkRole('admin'), adminController.deleteTrainer);
router.put('/member/:id',  checkRole('admin'), adminController.modifyMemberData);
router.put('/trainer/:id', checkRole('admin'), adminController.modifyTrainerShifts);

module.exports = router;
