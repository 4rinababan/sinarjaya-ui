
import request from "./api";

export const notificationService = {
  getNotification: (userId) => 
    request(`/notification?user_id=${userId}`, {}, true),

   markAsRead: (id) =>
    request(`/notification/${id}/read`, { method: "PATCH" }, true),

  getNotificationAdmin: () => 
    request(`/notification/admin`, {}, true),
};
