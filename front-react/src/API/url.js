import axios from "axios";
const url = process.env.NODE
  ? "https://react-todolist-authentication.herokuapp.com/api/users/auth"
  : "http://localhost:5000/api/users/auth";
export default axios.create({
  baseURL: url,
});

export const urlTarea =
  "https://react-todolist-authentication.herokuapp.com/api/tareas";
export const urlUsers = url;
