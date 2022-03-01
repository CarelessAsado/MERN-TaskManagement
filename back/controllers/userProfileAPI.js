const { CustomError } = require("../ERRORS/CustomError");
const errorWrapper = require("../ERRORS/errorWrapper");
const User = require("../models/User");

module.exports = {
  getUserProfile: errorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const foundUser = await User.findById(id, { contraseña: 0, tareas: 0 });
    if (!foundUser) {
      return next(new CustomError("Usuario no existe.", 404));
    }
    return res.status(200).json(foundUser);
  }),
};
