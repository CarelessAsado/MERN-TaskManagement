class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
function createCustomError(msg, code) {
  return new CustomError(msg, code);
}

module.exports = {
  createCustomError,
  CustomError,
  UnauthorizedError,
  ForbiddenError,
};
