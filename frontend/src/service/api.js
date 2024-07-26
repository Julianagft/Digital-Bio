"use client"
import axios from 'axios';

const API = axios.create({
//   baseURL: "https://projeto-final-fs24-yqy0.onrender.com/",
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json", 
  }
});

const token = typeof localStorage !== "undefined" ? localStorage.getItem('token') : null;
if (token) {
  API.defaults.headers.common["token"] = token;
}


export default API;
