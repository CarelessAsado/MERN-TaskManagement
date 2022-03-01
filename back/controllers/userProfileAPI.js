const errorWrapper = require("../ERRORS/errorWrapper");
const User = require("../models/User");

module.exports = {
  getUserProfile: errorWrapper(async (req, res) => {
    const { id } = req.params;
    const foundUser = await User.findById(id, { contraseña: 0, tareas: 0 });
    if (!foundUser) {
      return res.status(404).json("Usuario no existe.");
    }
    return res.status(200).json(foundUser);
  }),
};
