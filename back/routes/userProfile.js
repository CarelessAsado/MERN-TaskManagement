const { Router } = require("express");
const { getUserProfile } = require("../controllers/userProfileAPI");

const router = Router();
router.get("/:id", getUserProfile);
module.exports = router;
