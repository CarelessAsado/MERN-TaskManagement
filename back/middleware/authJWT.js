const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const authHeader = req.headers.auth;
  if (!authHeader) {
    return res.status(401).send("No estás autorizado.");
  }
  const token = authHeader;
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(403).send("El token no es válido.");
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
    return res.status(401).send("No estás autorizado.");
  }
  const token = secretLink;
  console.log(token, req.params, "SECRET LINK MIDDLEWARE CHEQUEANDO");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res
        .status(403)
        .send(
          "El link no es válido. No se puede llevar a cabo el cambio de contraseña."
        );
    }
    req.userChangingPwd = user._id;
    next();
  });
}
module.exports = { verifyEmailLink, verifyToken };
