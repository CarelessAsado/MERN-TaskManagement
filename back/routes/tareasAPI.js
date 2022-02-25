const express = require("express");
const router = express.Router();
const {
  guardarTarea,
  getAllTareas,
  borrarTarea,
  actualizarTarea,
} = require("../controllers/tareasAPI");

router.get("/", getAllTareas);
router.post("/", guardarTarea);
router.delete("/:taskId", borrarTarea);
router.patch("/:taskId", actualizarTarea);

module.exports = router;
