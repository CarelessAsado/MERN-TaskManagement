class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function createCustomError(msg, code) {
  return new CustomError(msg, code);
}

module.exports = { createCustomError, CustomError };
