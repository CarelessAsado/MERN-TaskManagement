const jwt = require("jsonwebtoken");
const { ForbiddenError, UnauthorizedError } = require("../ERRORS/CustomError");

function verifyToken(req, res, next) {
  const authHeader = req.headers.auth;

  console.log("Accesstoken present: ", authHeader.length, req.url);
  if (!authHeader) {
    return next(
      new UnauthorizedError("No estás autorizado. No existe token de acceso.")
    );
  }
  const token = authHeader;
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return next(new ForbiddenError("El token de acceso no es válido."));
    }
    /*-----Esta el mail tmb pero no lo uso, agregar dsp roles*/
    req.user = user._id;
    next();
  });
}
/*-------------------------------VERIFICACION DE TOKEN EN CASO
                            DE OLVIDARSE EL PASSWORD Y Q MANDAMOS EL 
                            SECRETLINK----------------------------------------------------------------*/
function verifyEmailLink(req, res, next) {
  const { secretLinkId: secretLink } = req.params;
  if (!secretLink) {
    return next(new UnauthorizedError("No estás autorizado."));
  }
  const token = secretLink;
  console.log(token, req.params, "SECRET LINK MIDDLEWARE CHEQUEANDO");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return next(
        new ForbiddenError(
          "El link no es válido. No se puede llevar a cabo el cambio de contraseña."
        )
      );
    }
    req.userChangingPwd = user._id;
    next();
  });
}
module.exports = { verifyEmailLink, verifyToken };
