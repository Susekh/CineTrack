import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/api`,
  withCredentials: true,
});

// Log requests
api.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
    if (config.data) console.log("Body:", config.data);
    return config;
  },
  (error) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);

// Log responses
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API Error:", error.response.status, error.response.data);
    } else {
      console.error("Network/Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
