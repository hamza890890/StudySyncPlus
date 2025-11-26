import axios from "axios";

const API = axios.create({
  baseURL: "https://studysyncplus-backend.onrender.com/api"

});

export default API;
