// src/services/productService.js
import request from "./api";

export const productService = {
  getAll: (page = 1, limit = 10) =>
    request(`/products?page=${page}&limit=${limit}`, {}, false),

  getProductID: (id) =>
    request(`/products/${id}`, {}, false),

  getProductCategoryID: (id) =>
    request(`/categories/${id}/products`, {}, false),

  getBestSellingProducts: () =>
    request(`/products/best-selling`, {}, false),

  create: (data) =>
    request(`/products`, { method: "POST", body: data }, true),

  update: (id, data) =>
    request(`/products/${id}`, { method: "PATCH", body: data }, true),

  delete: (id) =>
    request(`/products/${id}`, { method: "DELETE" }, true),
};
