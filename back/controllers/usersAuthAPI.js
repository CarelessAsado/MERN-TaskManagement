//IMPORTAR MODELO
const User = require("../models/User");
const { TareaModel: Tarea } = require("../models/tareas");
/*---BCRYPT----------*/
const bcrypt = require("bcrypt");
/*-----JWT--------------*/
const jwt = require("jsonwebtoken");
/*----------------------------*/
const validateUserInput = require("../middleware/customValidation");
/*------NODEMAILER---------------*/
const sendEmail = require("../middleware/nodemailer");

async function registerUsuario(req, res) {
  try {
    const { emailUsuario, contraseña, confirmaContraseña, nombre } = req.body;
    /*---------------PRE VALIDATION------------------------*/
    const errorString = validateUserInput(
      { emailUsuario, contraseña, confirmaContraseña, nombre },
      "register"
    );
    if (errorString) {
      return res.status(400).json(errorString);
    }
    /*-----VALIDAR contraseña*/ //********************* */
    let passHashed = await bcrypt.hash(contraseña, 10);
    let usuarioACrear = new User({
      emailUsuario,
      contraseña: passHashed,
      nombre,
    });
    const nuevoUsuario = await usuarioACrear.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.name == "ValidationError") {
      let errors = Object.values(error.errors).map((val) => val.message);
      if (errors.length > 1) {
        return res.status(400).json(errors.join(" "));
      } else {
        return res.status(400).json(errors);
      }
      //DUPLICATE KEY
    } else if (error.code == 11000) {
      res.status(409).send("Ya existe un usuario registrado con ese mail.");
    } else {
      res.status(500).json(error);
    }
  }
}

async function loginUsuario(req, res) {
  const { emailUsuario, contraseña } = req.body;
  if (!emailUsuario || !contraseña) {
    return res.status(400).json("No puede haber campos vacíos");
  }
  try {
    let user = await User.findOne({ emailUsuario });

    if (!user) {
      return res.status(401).json("Usuario o contraseña no coinciden.");
    }

    if (await bcrypt.compare(contraseña, user.contraseña)) {
      /*----MAGIA JWT--------------*/
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      const { contraseña, tareas, ...rest } = user._doc;
      return res.status(200).json({ accessToken, ...rest });
    } else {
      return res.status(401).json("Usuario o contraseña no coinciden.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}
/*-----------------------------------------FORGOT PASSWORD----------------------*/
/*----SEND ME AN EMAIL*/
async function forgotPassword(req, res) {
  const { emailUsuario } = req.body;
  if (!emailUsuario) {
    return res.status(400).json("No puede haber campos vacíos");
  }
  try {
    let user = await User.findOne({ emailUsuario });

    if (!user) {
      return res
        .status(401)
        .json("No existe un usuario registrado con esa información.");
    }
    /*----MAGIA JWT--------------*/
    const secretLinkToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    }); //CAMBIAR EL EXPIRATION TIME
    await sendEmail(user, secretLinkToken);
    return res
      .status(200)
      .json(
        "Revisá tu casilla de email para proseguir con el proceso de cambio de contraseña."
      );
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function forgotPasswordCreateNew(req, res) {
  console.log(req.userChangingPwd, "llegamos", req.body);
  const userToUpdatePwd = await User.findById({ _id: req.userChangingPwd });
  if (!userToUpdatePwd) {
    return res.status(404).json("No existe el usuario.");
  }
  const { contraseña, confirmaContraseña } = req.body;
  /*-----VALIDAR contraseña*/ //********************* */
  const errorString = validateUserInput({ contraseña, confirmaContraseña });
  if (errorString) {
    return res.status(400).json(errorString);
  }

  try {
    let passHashed = await bcrypt.hash(contraseña, 10);
    userToUpdatePwd.contraseña = passHashed;
    const nuevoUsuario = await userToUpdatePwd.save();
    return res.status(201).json("Se realizó el cambio exitosamente.");
  } catch (error) {
    res.status(500).json(error.message);
  }
}
module.exports = {
  registerUsuario,
  loginUsuario,
  forgotPassword,
  forgotPasswordCreateNew,
};
