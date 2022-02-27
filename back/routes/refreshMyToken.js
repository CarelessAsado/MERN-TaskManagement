const { Router } = require("express");
const { refreshMyToken } = require("../controllers/refreshMyToken");
const router = Router();
router.get("/", refreshMyToken);
module.exports = router;
