// src/services/api.js
import axios from "axios";

// Axios örneğini oluşturarak baseURL belirleme
const api = axios.create({
  baseURL: "https://api.example.com/",
});

export default api;
