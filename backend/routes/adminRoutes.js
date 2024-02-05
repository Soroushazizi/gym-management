const express = require('express');
const adminController = require('../controllers/adminController');
const {checkRole, validate} = require("../Util");
const router = express.Router();

router.post('/member', checkRole('admin'), adminController.addMember);
router.delete('/member/:id', checkRole('admin'), adminController.deleteMember);
router.get('/trainer', checkRole('admin'), adminController.showTrainers);
router.post('/trainer', [validate('addTrainer'), checkRole('admin')], adminController.addTrainer);
router.delete('/trainer/:id', [validate('deleteTrainer'), checkRole('admin')], adminController.deleteTrainer);
router.patch('/member/:id', [validate('modifyMemberData'), checkRole('admin')], adminController.modifyMemberData);
router.patch('/trainer/:id', [validate('modifyTrainerShifts'), checkRole('admin')], adminController.modifyTrainerShifts);

module.exports = router;
