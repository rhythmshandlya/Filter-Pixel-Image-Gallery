// Import the Axios library
const axios = require("axios");

// Create a new Axios instance with custom configurations
const axiosPrivate = axios.create({
  // Set the base URL for your private API
  baseURL: "http://localhost:8000/api/",

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json, text/plain, /",
  },

  // Enable CORS by specifying the allowed origin(s) of your frontend application
  // You can set it to '*' to allow any origin (not recommended for production)
  // or set it to a specific origin like 'https://your-frontend-app.example.com'
  // to only allow requests from that origin.
  // Change this according to your requirements.
  withCredentials: true,
  crossDomain: true,
});

export default axiosPrivate;
