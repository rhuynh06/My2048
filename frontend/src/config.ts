const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const BACKEND_URL = isLocalhost
  ? "http://localhost:5050"
  : "https://my2048.onrender.com";