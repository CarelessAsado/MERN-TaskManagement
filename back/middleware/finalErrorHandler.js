const { CustomError } = require("../ERRORS/CustomError");

const finalErrorHandler = (error, req, res, next) => {
  console.log(error instanceof CustomError, "final error handler middle");
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.message);
  }
  if (error.name == "ValidationError") {
    let errors = Object.values(error.errors).map((val) => val.message);
    if (errors.length > 1) {
      return res.status(400).json(errors.join(" "));
    } else {
      return res.status(400).json(errors);
    }
  }
  //DUPLICATE KEY
  if (error.code == 11000) {
    res.status(409).send("Ya existe un usuario registrado con ese mail.");
  }
  return res.status(500).json(error.message);
};
module.exports = finalErrorHandler;
