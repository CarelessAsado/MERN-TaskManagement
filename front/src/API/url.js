import axios from "axios";

const url =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://react-task-management.herokuapp.com/api/";

export const axiosPRELogin = axios.create({
  baseURL: url,
});
export default axios.create({
  baseURL: url,
});
