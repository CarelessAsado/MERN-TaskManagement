module.exports = function validateUserInput(input, etapa) {
  let errorString = "";
  const { emailUsuario, confirmaContraseña, contraseña, nombre } = input;
  if (etapa === "register") {
    if (!emailUsuario || !confirmaContraseña || !contraseña || !nombre) {
      errorString += "No puede haber campos vacíos. ";
    }
  } else {
    if (!confirmaContraseña || !contraseña) {
      errorString += "No puede haber campos vacíos. ";
    }
  }
  if (contraseña && (contraseña.length < 6 || contraseña.length > 15)) {
    errorString += "La contraseña debe tener entre 6 y 15 carácteres. ";
  }
  if (contraseña && confirmaContraseña != contraseña) {
    errorString += "Las contraseñas no condicen. ";
  }
  return errorString;
};
