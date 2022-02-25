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
    req.user = user.id;
    next();
  });
}
/*-------------------------------VERIFICACION DE TOKEN EN CASO
                            DE OLVIDARSE EL PASSWORD Y Q MANDAMOS EL 
                            SECRETLINK*/
function verifyEmailLink(req, res, next) {
  console.log(req.params, "PARAMS EN MIDDLE");
  const { secretLinkId: secretLink } = req.params;
  if (!secretLink) {
    return res.status(401).send("No estás autorizado.");
  }
  const token = secretLink;
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res
        .status(403)
        .send(
          "El link no es válido. No se puede llevar a cabo el cambio de contraseña."
        );
    }
    req.userChangingPwd = user.id;
    next();
  });
}
module.exports = { verifyEmailLink, verifyToken };
