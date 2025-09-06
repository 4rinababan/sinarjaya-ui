import request from "./api";

export const orderService = {
  create: (payload) =>
    request("/orders", {
      method: "POST",
      body: payload,//JSON.stringify(payload),
    }, false), // ✅ butuh token
    
   getAll: ({ page = 1, limit = 5 } = {}) => {
    const query = `?page=${page}&limit=${limit}`;
    return request(`/orders${query}`, {}, true);
  },
  getDashboard: () => request(`/orders/dashboard`, {}, true), 
  getById: (id) => request(`/orders/${id}`, {}, true), // ✅ butuh token
  getOrderUserId: (userId) => request(`/orders/user/${userId}`, {}, true), // ✅ butuh token
  getOrderHistory: (userId) => request(`/orders/history/${userId}`, {}, true), // ✅ butuh token
  updateOrder: (id, payload) =>
  request(`/orders/${id}/status`, {
    method: "PATCH",
    body: payload,
  }, true),

};
