const Doctor = require('../models/Doctor');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

exports.addDoctor = async (request, response, next) => {
    try {
            if (errorHandler.validate(['name','phoneNumber'], request.body)) {
                return errorHandler.createError(1003);
            }
            let {phoneNumber}=request.body;
            let doctor = await Doctor.findOne({ phoneNumber: phoneNumber });
            if(!doctor){
                doctor= await Doctor.create(request.body);
            }
            return apiResponder(request, response, next, true, 2051, doctor);
        }
     catch (error) {
        next(error);
    }
}


exports.getDoctors = async (request, response, next) => {
    try {
        const doctors = await Doctor.find({}, '-createdAt -updatedAt').sort({distance: 1});
        return apiResponder(request, response, next, true, 2052, doctors);

    } catch (error) {
        next(error);
    }
}

exports.deleteDoctor = async (request, response, next) => {
    try {
        let {doctorid}=request.body;
        if (errorHandler.validate(['doctorId'], request.body)) {
            return errorHandler.createError(1003);
        }
        let doctor = await Doctor.findOneAndDelete({ _id: doctorId })

        if (doctor) {
            return apiResponder(request, response, next, true, 2053, {});
        } else {
            return apiResponder(request, response, next, true, 4004, {});
        }
        
    } catch (error) {
        next(error)
    }
}






