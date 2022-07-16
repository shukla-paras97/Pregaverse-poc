const express = require("express");
const router = express.Router();
const userController= require("../controller/user.controller");
const verifyToken = require('../middlewares/auth')
const multer =  require('multer');
const uploadAwsFile = require('../utils/uploadAwsFile')
const sendNotification = require('../utils/sendNotification')

router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.initiateUser);
router.put('/update-profile', verifyToken, userController.updateUser);
router.get('/get-profile', verifyToken, userController.profile);

router.post('/upload-file', multer({ dest: './public/temp', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    'media'
  ),  async (request, response) =>{
    try {
      const file = request.file
      let url = await uploadAwsFile.uploadAwsFile(file)
      return response.status(200).send({url: url});
    } catch (error) {
      return response.status(500).send('Something went wrong');
    }
  })

  router.post('/send-notify', sendNotification.sendNotification);



module.exports=router;