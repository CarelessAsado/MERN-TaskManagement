const express = require("express");
const router = express.Router();
const {
  registerUsuario,
  loginUsuario,
  forgotPassword,
  forgotPasswordCreateNew,
  logOUTUsuario,
} = require("../controllers/usersAuthAPI");
const { verifyEmailLink } = require("../middleware/authJWT");

router.post("/register", registerUsuario);
router.post("/login", loginUsuario);
router.get("/logout", logOUTUsuario);
router.post("/forgot-password/sendEmail", forgotPassword);
router.put(
  "/forgot-password/:secretLinkId/changePassword",
  verifyEmailLink,
  forgotPasswordCreateNew
);

module.exports = router;
