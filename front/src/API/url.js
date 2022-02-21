import axios from "axios";

const url = process.env.NODE
  ? "https://react-todolist-authentication.herokuapp.com/api/"
  : "http://localhost:5000/api/";

export default axios.create({
  baseURL: url,
});
