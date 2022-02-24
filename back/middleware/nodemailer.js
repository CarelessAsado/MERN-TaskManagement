const nodemailer = require("nodemailer");
const { currentUrl, urlAuthAPI } = require("../models/currentUrl");

async function sendEmail(user) {
  const { emailUsuario, nombre } = user;
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
    const goldenLink = currentUrl + urlAuthAPI + "/" + user._id;
    let info = await transporter.sendMail({
      from: `"Rodrigo López" <${process.env.NODEMAIL}>`, // sender address
      to: "rodrigohernanlopez89@gmail.com, " + emailUsuario, //PONER MAIL DINAMICO DSP
      subject: "Password recovery - Rodrigo entreprises", // Subject line

      html: `<b>Hola ${nombre || "usuario"}</b>
            <div>
        Presioná en el link de a continuación para proseguir con el cambio de
        contraseña.
      </div>
      <a href=""+goldenLink target="_blank" rel="noopener noreferrer">
        ${goldenLink}
      </a>
      <br>
      <div>
        Si no solicitaste este cambio de contraseña, quedate tranquilo que en
        Rodrigo Entreprises cuidamos tu data como si fuera la nona.
      </div>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.log(error, "errorrr NODEMAILER");
  }
}

module.exports = sendEmail;
