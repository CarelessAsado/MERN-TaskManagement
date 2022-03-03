//IMPORTAR MODELO
const User = require("../models/User");
const { TareaModel: Tarea } = require("../models/tareas");
//ERROR CLASSES
const errorWrapper = require("../ERRORS/errorWrapper");
const {
  UnauthorizedError,
  ForbiddenError,
  CustomError,
} = require("../ERRORS/CustomError");

/*---BCRYPT----------*/
const bcrypt = require("bcrypt");
/*-----JWT--------------*/
const jwt = require("jsonwebtoken");
/*----------------------------*/
const validateUserInput = require("../middleware/customValidation");
/*------NODEMAILER---------------*/
const sendEmail = require("../middleware/nodemailer");
const { expirationTokens } = require("../models/currentUrl");

const registerUsuario = errorWrapper(async function (req, res, next) {
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
});

async function logOUTUsuario(req, res) {
  res.clearCookie("jwtRefreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json("Logout successful.");
}
const loginUsuario = errorWrapper(async function (req, res, next) {
  const { emailUsuario, contraseña } = req.body;
  if (!emailUsuario || !contraseña) {
    return res.status(400).json("No puede haber campos vacíos");
  }

  let user = await User.findOne({ emailUsuario });

  if (!user) {
    return next(new UnauthorizedError("Usuario o contraseña no coinciden."));
  }

  if (await bcrypt.compare(contraseña, user.contraseña)) {
    /*----MAGIA JWT--------------*/
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    /*----Creo q hay q borrar la cookie al loguear out*/
    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    const { contraseña, tareas, ...rest } = user._doc;
    return res.status(200).json({ accessToken, ...rest });
  } else {
    return next(new UnauthorizedError("Usuario o contraseña no coinciden."));
  }
});
/*-----------------------------------------FORGOT PASSWORD----------------------*/
/*----SEND ME AN EMAIL*/
const forgotPassword = errorWrapper(async function (req, res, next) {
  const { emailUsuario } = req.body;
  if (!emailUsuario) {
    return res.status(400).json("No puede haber campos vacíos");
  }
  let user = await User.findOne({ emailUsuario });

  if (!user) {
    return next(
      new UnauthorizedError(
        "No existe un usuario registrado con esa información."
      )
    );
  }
  /*----MAGIA JWT--------------*/
  const secretLinkToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  }); //CAMBIAR EL EXPIRATION TIME
  await sendEmail(user, secretLinkToken);
  return res
    .status(200)
    .json(
      "Revisá tu casilla de email para proseguir con el proceso de cambio de contraseña."
    );
});
const forgotPasswordCreateNew = errorWrapper(async function (req, res, next) {
  console.log(req.userChangingPwd, "llegamos", req.body);
  const userToUpdatePwd = await User.findById({ _id: req.userChangingPwd });
  if (!userToUpdatePwd) {
    return next(new CustomError("No existe el usuario.", 404));
  }
  const { contraseña, confirmaContraseña } = req.body;
  /*-----VALIDAR contraseña*/ //********************* */
  const errorString = validateUserInput({ contraseña, confirmaContraseña });
  if (errorString) {
    return res.status(400).json(errorString);
  }
  let passHashed = await bcrypt.hash(contraseña, 10);
  userToUpdatePwd.contraseña = passHashed;
  const nuevoUsuario = await userToUpdatePwd.save();
  return res.status(201).json("Se realizó el cambio exitosamente.");
});
module.exports = {
  registerUsuario,
  loginUsuario,
  logOUTUsuario,
  forgotPassword,
  forgotPasswordCreateNew,
};
