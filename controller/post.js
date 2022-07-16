const Post = require('../models/Post');
const User = require('../models/User');
const Comment=require('../models/Comment');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

// add post api
exports.addPost = async (request, response, next) => {
    try {
        if (errorHandler.validate(['image','message'], request.body)) {
            return errorHandler.createError(1003);
        }
        request.body.user = request.user.id
        let post = await Post.findOne(request.body);
        if (!post) {
            post = await Post.create(request.body);
        }
        return apiResponder(request, response, next, true, 2016, post);
    }
    catch (error) {
        next(error);
    }
}

exports.getPosts = async (request, response, next) => {
    try {
        const posts = await Post.find({}).populate({path:"user", model: User}).sort('-createdAt');
        let data = []
        for(let post of posts){
            data.push({
                userName:post.user.name,
                image:post.image,
                message:post.message,
                comment:await Comment.countDocuments({post:post._id})
            })
        }
        return apiResponder(request, response, next, true, 2017, data)

    } catch (error) {
        next(error);
    }
}

exports.deletePost = async (request, response, next) => {
    try {
        let {postId}=request.body;
        if (errorHandler.validate(['postId'], request.body)) {
            return errorHandler.createError(1003);
        }
        let post = await Post.findOneAndDelete({ _id: postId })

        if (post) {
            return apiResponder(request, response, next, true, 2018, {});
        } else {
            return apiResponder(request, response, next, true, 4006, {});
        }
        
    } catch (error) {
        next(error)
    }
}


