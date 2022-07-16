const express = require("express");
const router = express.Router();
const postController= require("../controller/post");
const verifyToken = require('../middlewares/auth')

router.post('/add-post',verifyToken, postController.addPost);
router.get('/get-post',verifyToken ,postController.getPosts);
router.delete('/delete-post', verifyToken, postController.deletePost);

module.exports=router;