import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3042",
});

export default axiosInstance;
