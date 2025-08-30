import { getToken } from "../utils/storage";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_BASE = `${BASE_URL}/api`;

const request = async (url, options = {}, useAuth = true) => {
  try {
    const headers = {
      ...(options.headers || {}),
    };

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (useAuth) {
      const token = getToken();
      if (!token) {
        throw new Error("Authorization header required");
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Bisa tampilkan toast di sini kalau punya callback
      const message = data.message || "Request failed";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error; // lempar ke pemanggil untuk di-handle di UI
  }
};

export default request;
