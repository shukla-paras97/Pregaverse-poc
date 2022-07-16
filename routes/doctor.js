const express = require("express");
const router = express.Router();
const doctorController= require("../controller/doctor");
const verifyToken = require('../middlewares/adminAuth')

router.post('/add-doctor',verifyToken, doctorController.addDoctor);
router.get('/get-doctor',verifyToken ,doctorController.getDoctors);
router.delete('/delete-doctor', verifyToken, doctorController.deleteDoctor);

module.exports=router;