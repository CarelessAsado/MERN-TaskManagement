const express = require("express");
const router = express.Router();
const {
  registerUsuario,
  loginUsuario,
  forgotPassword,
  forgotPasswordCreateNew,
} = require("../controllers/usersAuthAPI");

router.post("/register", registerUsuario);
router.post("/login", loginUsuario);
router.post("/forgot-password/sendEmail", forgotPassword);
router.put("/forgot-password/:id/changePassword", forgotPasswordCreateNew);

module.exports = router;
