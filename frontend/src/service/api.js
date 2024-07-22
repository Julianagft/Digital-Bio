import axios from 'axios';

import axios from "axios";

const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: "https://projeto-final-fs24.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    "token": token || ""  
  }
});


export const setToken = (newToken) => {
  localStorage.setItem("token", newToken);
  API.defaults.headers.common["token"] = newToken;
};

export default API;
