const express = require("express");
const router = express.Router();
const dietController= require("../controller/diet");
const verifyToken = require('../middlewares/adminAuth')

router.post('/add-diet',verifyToken, dietController.addDiet);
router.get('/get-diet',verifyToken, dietController.getDiet);
router.delete('/delete-diet', verifyToken, dietController.deleteDiet);

module.exports=router;