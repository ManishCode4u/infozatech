// Central API Configuration
const getApiUrl = () => {
  // If explicitly specified in environment, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Local development fallback to local express server
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:5000";
  }

  // Production on Vercel: same-origin relative /api routes
  return "";
};

const API_URL = getApiUrl();

export default API_URL;
