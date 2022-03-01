const { ForbiddenError } = require("../ERRORS/CustomError");
const errorWrapper = require("../ERRORS/errorWrapper");
const { TareaModel: Tarea } = require("../models/tareas");
const User = require("../models/User");

const guardarTarea = errorWrapper(async function (req, res) {
  const todasTareas = await User.findById({ _id: req.user }, "tareas");
  let nuevaTarea = new Tarea(req.body);
  todasTareas.tareas.push(nuevaTarea);
  await todasTareas.save();
  res.status(201).json(nuevaTarea);
});

const getAllTareas = errorWrapper(async function (req, res) {
  const { tareas: tareasTodas } = await User.findById(
    { _id: req.user },
    "tareas"
  );
  res.status(200).json(tareasTodas);
});

const borrarTarea = errorWrapper(async function (req, res, next) {
  const { taskId: id } = req.params;
  const user = await User.findOne({ "tareas._id": id });
  if (user._id != req.user) {
    return next(new ForbiddenError("No estás autorizado."));
  }
  let tareasAGuardar = user.tareas.filter((item) => item._id != id);
  user.tareas = tareasAGuardar;
  await user.save();
  return res.sendStatus(200);
});

const actualizarTarea = errorWrapper(async function (req, res) {
  const { taskId: id } = req.params;
  const user = await User.findOne({ "tareas._id": id });
  if (user._id != req.user) {
    return next(
      new ForbiddenError(
        "No estás autorizado a modificar las tareas de otro usuario."
      )
    );
  }
  user.tareas.forEach((item) => {
    if (item._id == id) {
      for (let key in req.body) {
        item[key] = req.body[key];
      }
    }
  });
  await user.save();
  res.sendStatus(200);
});
module.exports = { guardarTarea, getAllTareas, borrarTarea, actualizarTarea };
