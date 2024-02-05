const express = require('express');
const adminController = require('../controllers/adminController');
const {checkRole} = require("../Util");
const router = express.Router();

router.post('/login', adminController.login);
router.post('/member', checkRole('admin'), adminController.addMember);
router.delete('/member/:id', checkRole('admin'), adminController.deleteMember);
router.get('/trainer', checkRole('admin'), adminController.showTrainers);
router.post('/trainer', checkRole('admin'), adminController.addTrainer);
router.delete('/trainer/:id', checkRole('admin'), adminController.deleteTrainer);
router.patch('/member/:id', checkRole('admin') , adminController.modifyMemberData);
router.patch('/trainer/:id', checkRole('admin') ,adminController.modifyTrainerShifts);

module.exports = router;
