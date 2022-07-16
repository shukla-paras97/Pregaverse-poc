const Hospital = require('../models/Hospital');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

exports.addHospital = async (request, response, next) => {
    try {
            if (errorHandler.validate(['name','phoneNumber','distance'], request.body)) {
                return errorHandler.createError(1003);
            }
            let {phoneNumber}=request.body;
            let hospital = await Hospital.findOne({ phoneNumber: phoneNumber });
            if(!hospital){
                hospital= await Hospital.create(request.body);
            }
            return apiResponder(request, response, next, true, 2054, hospital);
        }
     catch (error) {
        next(error);
    }
}


exports.getHospitals = async (request, response, next) => {
    try {
        const hospitals = await Hospital.find({}, '-createdAt -updatedAt').sort({distance: 1});
        return apiResponder(request, response, next, true, 2055, hospitals);

    } catch (error) {
        next(error);
    }
}

exports.deleteHospital = async (request, response, next) => {
    try {
        let {hospitalId}=request.body;
        if (errorHandler.validate(['hospitalId'], request.body)) {
            return errorHandler.createError(1003);
        }
        let hospital = await Hospital.findOneAndDelete({ _id: hospitalId })

        if (hospital) {
            return apiResponder(request, response, next, true, 2056, {});
        } else {
            return apiResponder(request, response, next, true, 4005, {});
        }
        
    } catch (error) {
        next(error)
    }
}






