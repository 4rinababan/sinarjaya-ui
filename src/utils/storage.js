import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";


const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

// ===== TOKEN ===== //
export function saveToken(token) {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  localStorage.setItem("jwt", encrypted);
}

export function getToken() {
  const encrypted = localStorage.getItem("jwt");
  if (!encrypted) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

// ===== USER ===== //
export function saveUser(user) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(user),
    SECRET_KEY
  ).toString();
  localStorage.setItem("user", encrypted);
}

export function getSavedUser() {
  const encrypted = localStorage.getItem("user");
  if (!encrypted) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem("jwt");
  // localStorage.removeItem("user");
}
