const jwt = require("jsonwebtoken");
const { expirationTokens } = require("../models/currentUrl");
async function refreshMyToken(req, res) {
  const cookies = req.cookies;
  console.log(req.cookies, "VER SI SE NECESITA TRUE NO SE QUES");
  if (!cookies?.jwtRefreshToken) {
    return res.status(401).json("El refresh token no existe.");
  }
  const { jwtRefreshToken } = cookies;
  /*-------------Aca se busca en la Bd de refresh token al user*/
  try {
    /*     let user = await User.findOne({ emailUsuario });

    if (!user) {
      return res.status(403).json("No existe usuario con ese refresh token.");
    } */
    jwt.verify(
      jwtRefreshToken,
      process.env.JWT_REFRESH_SECRET,
      (error, decodedUser) => {
        if (error) {
          return res.status(403).send("El token no es válido.");
        }
        console.log(
          decodedUser,
          "VER BIEN Q NO HAYA ERRORES CON EL DECODE DEL REFRESH TOKEN"
        );
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
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

module.exports = { refreshMyToken };
