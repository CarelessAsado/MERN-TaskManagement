const { ForbiddenError } = require("../ERRORS/CustomError");

function isUserOwner(req, res, next) {
  console.log(req.user, req.params.id, "estamos chequeando ownership");
  if (req.user !== req.params.id) {
    return next(
      new ForbiddenError(
        "No tenés acceso a esa información. Pertenece a otro usuario."
      )
    );
  }
  next();
}
module.exports = isUserOwner;
