import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle 401 globally (e.g. clear token and redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function extractApiError(error, fallback = "Something went wrong") {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors.length > 0) return data.errors.join(", ");
  if (Array.isArray(data?.validationErrors) && data.validationErrors.length > 0) {
    return data.validationErrors.join(", ");
  }
  return error?.message || fallback;
}

// Auth
export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");

// Movies
export const getMovies = () => api.get("/movies");
export const getMovieById = (id) => api.get(`/movies/${id}`);

export default api;
