const { Router } = require("express");
const { refreshMyToken } = require("../controllers/refreshMyToken");
const router = Router();
router.post("/", refreshMyToken);
module.exports = router;
