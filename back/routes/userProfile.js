const { Router } = require("express");
const { getUserProfile } = require("../controllers/userProfileAPI");
const isUserOwner = require("../middleware/isUserOwner");

const router = Router();
router.get("/:id", /* isUserOwner, */ getUserProfile);
module.exports = router;
