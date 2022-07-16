const CategoryData = require('../models/categoryData');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

exports.addExerciseMusicMeditation= async (request, response, next) => {
    try {
            if (errorHandler.validate(['category','description','videoUrl'], request.body)) {
                return errorHandler.createError(1003);
            }
            let categoryData = await CategoryData.findOne(request.body);
            if (!categoryData) {
                categoryData = await CategoryData.create(request.body);
            }
            return apiResponder(request, response, next, true,2015, categoryData);;
        }
     catch (error) {
        next(error);
    }
}