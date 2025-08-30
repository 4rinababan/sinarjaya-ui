import request from "./api";

export const userService = {

  getUserByID: (id) => request(`/users/${id}`, {
    method: "GET",
  },true),

  createUser: (payload) => request("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  },false),

  createAccount: (payload) => request("/user-accounts", {
    method: "POST",
    body: JSON.stringify(payload),
  },false),

  checkUserActive: (id) => 
  request(`/users/${id}/is-active`, {
    method: "GET"
  }, true),

  updatePasswordUserAccount: (payload) =>
  request("/user-accounts/update-password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  }, true),
  // updatePasswordUserAccount: (payload) =>
  //   request("/user-accounts/password", { method: "PUT", body: JSON.stringify(payload) }, true),

  login: (payload) => request("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  },false),

updateUserProfile: (id, formData) =>
  request(`/users/${id}`, {
    method: "PATCH",
    body: formData, // Jangan stringify
    headers: {} // Pastikan kosong, biarkan browser set boundary
  }, true),


};
