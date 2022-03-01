const { CustomError } = require("../ERRORS/CustomError");

const finalErrorHandler = (error, req, res, next) => {
  console.log(error, "final error handler middle");
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.message);
  }
  return res.status(500).json(error.message);
};

module.exports = finalErrorHandler;
