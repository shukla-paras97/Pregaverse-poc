const Admin = require('../models/Admin');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (request, response, next) => {
    try {
      let admin = await Admin.findOne({ email: request.body.email })
      if (admin) {
        return apiResponder(request, response, next, true, 2008, {});
      }
      request.body.password = await bcrypt.hash(request.body.password, 10)
      await Admin.create(request.body);
      return apiResponder(request, response, next, true, 2009, {});
    } catch (error) {
      next(error);
    }
  }

exports.login = async (request, response, next) => {
    try {
      const { email, password } = request.body;
      let admin = await Admin.findOne({ email })
      if (!admin) {
        return apiResponder(request, response, next, true, 2010, {});
      }
      const match = await bcrypt.compare(password, admin.password)
      if (!match) {
        return apiResponder(request, response, next, true, 2010, {});
      }
      let token = jwt.sign({
        id: admin._id,
        type: 'admin'
    }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' });
    let data = {
        token: token,
        id: admin._id,
        role: admin.role
    }
      return apiResponder(request, response, next, true, 2000, { token: token, role: admin.role });
    } catch (error) {
      next(error)
    }
  }



