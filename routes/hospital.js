const express = require("express");
const router = express.Router();
const hospitalController= require("../controller/hospital");
const verifyToken = require('../middlewares/adminAuth')

router.post('/add-hospital',verifyToken, hospitalController.addHospital);
router.get('/get-hospital',verifyToken ,hospitalController.getHospitals);
router.delete('/delete-hospital', verifyToken, hospitalController.deleteHospital);

module.exports=router;