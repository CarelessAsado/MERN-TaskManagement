import axios from "axios";

const url = "https://react-task-management.herokuapp.com/api/";

export default axios.create({
  baseURL: url,
});
