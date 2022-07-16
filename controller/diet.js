const Diet = require('../models/Diet');
const CategoryData = require('../models/categoryData');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

exports.addDiet = async (request, response, next) => {
    try {
        let diet = await Diet.findOne(request.body);
        if (!diet) {
            diet = await Diet.create(request.body);
        }
        return apiResponder(request, response, next, true, 2011, diet);
    }
    catch (error) {
        next(error);
    }
}


exports.getDiet = async (request, response, next) => {
    try {
        let { type, id } = request.query
        let categoryData;
        if(type == "veg" || type=="nonveg"){
            categoryData = await Diet.find({type: type});
        }else{
            categoryData = await CategoryData.find({category: id});
        }
        return apiResponder(request, response, next, true, 2012, categoryData);

    } catch (error) {
        next(error);
    }
}

exports.deleteDiet = async (request, response, next) => {
    try {
        let { dietId } = request.body;
        if (errorHandler.validate(['dietId'], request.body)) {
            return errorHandler.createError(1003);
        }
        let diet = await Diet.findOne({ _id: dietId })

        if (diet) {
            await Diet.deleteOne({ _id: dietId });
            return apiResponder(request, response, next, true, 2013, {});
        } else {
            return apiResponder(request, response, next, true, 2013, {});
        }

    } catch (error) {
        next(error)
    }
}