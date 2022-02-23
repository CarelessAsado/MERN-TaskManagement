const User = require("../models/User");

module.exports = {
  getUserProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const foundUser = await User.findById(id, { contraseña: 0, tareas: 0 });
      if (!foundUser) {
        return res.status(404).json("Usuario no existe.");
      }
      return res.status(200).json(foundUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  },
};
