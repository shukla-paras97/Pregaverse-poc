const express = require("express");
const router = express.Router();
const categoryDataController= require("../controller/categoryData");
const verifyToken = require('../middlewares/adminAuth')

router.post('/add', verifyToken, categoryDataController.addExerciseMusicMeditation);

module.exports=router;