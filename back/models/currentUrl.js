module.exports.currentUrl = process.env.NODE_ENV
  ? "https://frosty-archimedes-bb3dfe.netlify.app"
  : "http://localhost:3000";
/*----CAMBIAR AL FRONT CREO*/
module.exports.urlAuthAPI = "/api/users/auth";
module.exports.urlTareasAPI = "/api/tareas";
module.exports.urlUserProfileAPI = "/api/user/profile";
module.exports.urlRefreshMyToken = "/api/refresh";
module.exports.expirationTokens = { access: "10s", refresh: "9s" };
