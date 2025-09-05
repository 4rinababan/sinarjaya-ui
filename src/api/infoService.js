
import request from "./api";

export const infoService = {
getInfo: () =>
    request("/info", { method: "GET" },false),

  updateInfo: (formData) =>
    request("/info", {
      method: "PUT",
      // body: JSON.stringify(payload),
      body: formData,
    },true),
}

