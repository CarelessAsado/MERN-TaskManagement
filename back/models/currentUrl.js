module.exports.currentUrl = process.env.NODE_ENV
  ? "https://react-task-management.herokuapp.com"
  : "http://localhost:5000";

module.exports.urlAuthAPI = "/api/users/auth";
module.exports.urlTareasAPI = "/api/tareas";
module.exports.urlUserProfileAPI = "/api/user/profile";
