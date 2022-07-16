const express = require("express");
const router = express.Router();
const commentController= require("../controller/comment");
const verifyToken = require('../middlewares/auth')

router.post('/add-comment',verifyToken, commentController.addComment);
router.get('/get-comment',verifyToken ,commentController.getComments);
router.delete('/delete-comment', verifyToken, commentController.deleteComment);

module.exports=router;