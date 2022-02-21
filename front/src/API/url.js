import axios from "axios";

const url =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "";

export default axios.create({
  baseURL: url,
});
