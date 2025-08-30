
import request from "./api";

export const categoryService = {
  getAll: (page = 1, limit = 10) =>
    request(`/categories?page=${page}&limit=${limit}`, {}, false),

  create: (data) =>
    request(`/categories`, {
      method: "POST",
      body: data,
    }, true),

  update: (id, data) =>
    request(`/categories/${id}`, {
      method: "PATCH",
      body: data,
    }, true),

  delete: (id) =>
    request(`/categories/${id}`, {
      method: "DELETE",
    }, true),
};
