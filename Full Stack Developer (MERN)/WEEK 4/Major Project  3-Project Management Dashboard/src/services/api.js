import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   ADD JWT TOKEN TO EVERY API REQUEST
========================================================= */

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "taskflow_token"
      );

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================================================
   HANDLE AUTHENTICATION ERRORS
========================================================= */

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401
    ) {
      localStorage.removeItem(
        "taskflow_token"
      );

      localStorage.removeItem(
        "taskflow_user"
      );
    }

    return Promise.reject(error);
  }
);

export default api;