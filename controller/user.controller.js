const User = require("../models/User");
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const jwt = require("jsonwebtoken");

//1 Register User
exports.updateUser = async (request, response, next) => {
    try {
        //email already present
        request.body.isOnboarding = true
        let user = await User.updateOne({ _id: request.user.id }, {$set: request.body})
        user = await User.findOne({ _id: request.user.id })
        if (user) {
            return apiResponder(request, response, next, true, 2003, user);
        }
        return apiResponder(request, response, next, true, 2004, user);
    } catch (error) {
        next(error);
    }
}


//2.Login User
exports.initiateUser = async (request, response, next) => {
    try {
        if (errorHandler.validate(['phoneNumber', 'otp'], request.body)) {
            return errorHandler.createError(1003);
        }
        let { phoneNumber, otp } = request.body;
        
        let user = await User.findOne({ phoneNumber: phoneNumber, otp:otp })
        if (user) {
            let token = jwt.sign({
                id: user._id,
                type: user.role
            }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' });
            let data = {
                token: token,
                id: user._id,
                isOnboarding: user.isOnboarding ? true : false
            }
            return apiResponder(request, response, next, true, 2000, data);
        } else {
            return apiResponder(request, response, next, true, 2014, {});
        }

    } catch (error) {
        next(error);
    }
}


exports.sendOtp = async (request, response, next) => {
    try {
        if (errorHandler.validate(['phoneNumber'], request.body)) {
            return errorHandler.createError(1003);
        }
        let { phoneNumber } = request.body;
        
        let user = await User.findOne({ phoneNumber: phoneNumber}, 'phoneNumber')
        if (user) {
            return apiResponder(request, response, next, true, 2002, user);
        } else {
            user = await User.create({phoneNumber: phoneNumber, otp: '1234'})
            return apiResponder(request, response, next, true, 2002, user);
        }

    } catch (error) {
        next(error);
    }
}


exports.profile = async (request, response, next) => {
    try {
        //email already present
        let user = await User.findOne({ _id: request.user.id })
        return apiResponder(request, response, next, true, 200, user);
    } catch (error) {
        next(error);
    }
}
