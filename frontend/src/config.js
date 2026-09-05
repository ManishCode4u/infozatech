// Central API Configuration
const getApiUrl = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.includes("localhost")) {
      return import.meta.env.VITE_API_URL;
    }
    return "http://localhost:5000";
  }
  return import.meta.env.VITE_API_URL || "https://infozatech.onrender.com";
};

const API_URL = getApiUrl();

export default API_URL;
