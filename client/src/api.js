import axios from "axios";

const API = axios.create({
  baseURL: "https://studysyncplus.onrender.com/api"
});

export default API;
