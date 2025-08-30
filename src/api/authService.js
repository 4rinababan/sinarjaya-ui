
import request from "./api";

import { saveToken, getToken } from "../utils/storage";

export const authService = {
  
  login: async ({ phone, password }) => {
    const res = await request("/login", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
    },false);

    if (res.token) {
      saveToken(res.token);
    }
    return res;
  },

  isLoggedIn: () => !!getToken(),
};
