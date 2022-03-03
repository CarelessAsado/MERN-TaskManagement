const mongoose = require("mongoose");
const { TareaSchema } = require("./tareas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { expirationTokens } = require("./currentUrl");

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
/*-------------------GENERATE JWT ACCESS/REFRESH TOKENS---------------------*/
User.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: expirationTokens.access,
  });
};
User.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: expirationTokens.refresh,
  });
};
/*--------------------BCRYPT COMPARE/HASH PWD-----------------------------------------*/
User.methods.comparePass = async function (pass) {
  return await bcrypt.compare(pass, this.contraseña);
};

User.methods.hashPass = async function () {
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
};

module.exports = mongoose.model("User", User);
