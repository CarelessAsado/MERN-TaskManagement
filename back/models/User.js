const mongoose = require("mongoose");
const { TareaSchema } = require("./tareas");

const User = new mongoose.Schema(
  {
    emailUsuario: {
      type: String,
      required: [true, "Proveer email."],
      /*-------------OJO Q ESTO NO ES UN VALIDATOR-------------*/
      unique: [true, "Ya existe un usuario registrado con ese mail."],
      trim: true,
      lowercase: true,
    },
    contraseña: {
      type: String,
      required: [true, "Proveer contraseña."],
    },
    nombre: {
      type: String,
      required: [true, "Proveer nombre."],
      trim: true,
      lowercase: true,
      maxlength: [15, "No puede exceder de 15 caracteres el nombre."],
    },
    refreshToken: {
      type: String,
    },
    tareas: [TareaSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
