
import request from "./api";

export const infoService = {
getInfo: () =>
    request("/info", { method: "GET" },false),

  updateInfo: (payload) =>
    request("/info", {
      method: "PUT",
      body: JSON.stringify(payload),
    },true),
}
