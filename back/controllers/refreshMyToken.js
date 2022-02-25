const jwt = require("jsonwebtoken");
const { expirationTokens } = require("../models/currentUrl");
async function refreshMyToken(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwtRefreshToken) {
    return res.status(401).json("El refresh token no existe.");
  }
  console.log(cookies.jwtRefreshToken);
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
          { id: decodedUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: expirationTokens.access,
            S,
          }
        );
        const refreshToken = jwt.sign(
          { id: decodedUser._id },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: expirationTokens.refresh,
          }
        );
      }
    );
    if (await bcrypt.compare(contraseña, user.contraseña)) {
      /*----Creo q hay q borrar la cookie al loguear out*/
      res.cookie("jwtRefreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
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
