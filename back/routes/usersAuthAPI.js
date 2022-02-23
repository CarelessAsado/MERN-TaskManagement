const express = require("express");
const router = express.Router();
const {
  registerUsuario,
  loginUsuario,
  forgotPassword,
} = require("../controllers/usersAuthAPI");

router.post("/register", registerUsuario);
router.post("/login", loginUsuario);
router.post("/forgot-password", forgotPassword);

module.exports = router;
