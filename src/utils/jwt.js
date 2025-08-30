import { jwtDecode } from "jwt-decode";
import { saveEncrypted, getDecrypted } from "./storage";

export function saveToken(token) {
  saveEncrypted("jwt", token);
}

export function getToken() {
  return getDecrypted("jwt");
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
