const jwt = require("jsonwebtoken");
const { UnauthorizedError, ForbiddenError } = require("../ERRORS/CustomError");
const errorWrapper = require("../ERRORS/errorWrapper");
const { expirationTokens } = require("../models/currentUrl");

const refreshMyToken = errorWrapper(async function (req, res, next) {
  const cookies = req.cookies;
  if (!cookies?.jwtRefreshToken) {
    return next(new UnauthorizedError("El refresh token no existe."));
  }
  const { jwtRefreshToken } = cookies;
  /*-------------Aca se busca en la Bd de refresh token al user*/
  /*     let user = await User.findOne({ emailUsuario });
    if (!user) {
      return res.status(403).json("No existe usuario con ese refresh token.");
    } */
  jwt.verify(
    jwtRefreshToken,
    process.env.JWT_REFRESH_SECRET,
    (error, decodedUser) => {
      if (error) {
        /*-------------OJO de no ponerle 403 xq sino hay endless loop*/
        /*---ver de armar custom property en este error asi puede poner un conditional en el back y distinguirlo, en vez de usar error .status 402*/
        return next(new ForbiddenError("El REFRESH token no es válido."));
      }
      /*----MAGIA JWT--------------*/
      const accessToken = jwt.sign(
        { _id: decodedUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: expirationTokens.access,
        }
      );
      return res.status(200).json({ accessToken });
    }
  );
});

module.exports = { refreshMyToken };
