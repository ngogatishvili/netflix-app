const CustomError = require('../error/CustomError');

const errorHandler = (err, req, res, next) => {
  const error = {...err};


  return res
    .status(error.statusCode || 500)
    .json({success: false, msg: error.message||"something went wrong"});
};

module.exports = errorHandler;
  