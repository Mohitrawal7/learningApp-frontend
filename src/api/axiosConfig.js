import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:8080"
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    //token from localStorage
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
