const Comment = require('../models/Comment');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

exports.addComment = async (request, response, next) => {
    try {
        if (errorHandler.validate(['message','post'], request.body)) {
            return errorHandler.createError(1003);
        }
        request.body.user = request.user.id
        let comment = await Comment.findOne(request.body);
        if (!comment) {
            comment = await Comment.create(request.body);
        }
        return apiResponder(request, response, next, true, 2019, comment);
    }
    catch (error) {
        next(error);
    }
}

exports.getComments = async (request, response, next) => {
    try {
        const comments = await Comment.find({}, 'comment post user');
        return apiResponder(request, response, next, true, 2020, comments);

    } catch (error) {
        next(error);
    }
}

exports.deleteComment = async (request, response, next) => {
    try {
        let {commentId}=request.body;
        if (errorHandler.validate(['commentId'], request.body)) {
            return errorHandler.createError(1003);
        }
        let comment = await Comment.findOneAndDelete({ _id: commentId })

        if (comment) {
            return apiResponder(request, response, next, true, 2021, {});
        } else {
            return apiResponder(request, response, next, true, 4007, {});
        }
        
    } catch (error) {
        next(error)
    }
}