import axios from 'axios';

const API = axios.create({
//   baseURL: "https://projeto-final-fs24.onrender.com/",
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json", 
  }
});


export default API;