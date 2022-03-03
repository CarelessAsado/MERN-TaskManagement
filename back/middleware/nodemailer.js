const nodemailer = require("nodemailer");
const {
  currentUrl,
  urlAuthAPI,
  expirationTokens,
} = require("../models/currentUrl");

async function sendEmail(user, secretLinkToken) {
  const { emailUsuario, nombre = "usuario" } = user;
  console.log(secretLinkToken, "adentro");
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAIL,
      pass: process.env.NODEPWD,
    },
    tls: { rejectUnauthorized: false },
  });

  // EL transport object
  /*-------------------ESTA PARTE SE PUEDE AGREGAR DINAMICAMENTE
  A la funcion .sendMail se le puede agregar un CB si no querés usar promises*/
  try {
    /*----------ESTA URL es Client side/ REACT----*/
    const goldenLink =
      currentUrl + "/forgot-password/" + secretLinkToken + "/changePassword";
    /*-----Tiempo q tarda en expirar el link*/
    let expiresIn = expirationTokens.emailToken.match(/[0-9]/g).join("");

    let info = await transporter.sendMail({
      from: `"Rodrigo López" <${process.env.NODEMAIL}>`, // sender address
      to: emailUsuario, // MAIL DINAMICO
      subject: "Password recovery - Rodrigo entreprises", // Subject line

      html:
        "<b>Hola " +
        nombre +
        ":" +
        "</b><div>El siguiente link va a expirar en " +
        expiresIn +
        ' minutos.</div><div>Presioná el link de a continuación para proseguir con el cambio de contraseña.</div><a href=" ' +
        goldenLink +
        '" target="_blank" rel="noopener noreferrer">' +
        goldenLink +
        "</a><br><div>Si no solicitaste este cambio de contraseña, quedate tranquilo que en Rodrigo Entreprises cuidamos tu data como si fuera la nona.</div>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.log(error, "errorrr NODEMAILER");
  }
}

module.exports = sendEmail;
