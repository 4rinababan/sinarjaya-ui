import { useState, useEffect } from "react";
import { getUserFromToken } from "../utils/jwt";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decoded = getUserFromToken();
    if (decoded) setUser(decoded);
  }, []);

  return { user, setUser };
}
