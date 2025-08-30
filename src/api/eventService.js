
import request from "./api";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const eventService = {
  // API biasa (via fetch/axios)
  getEvents: (userId, role) =>
    request(`/events?user_id=${userId}&role=${role}`, {}, true),

  // SSE (real-time events)
  subscribe: (userId, role) => {
    const sseUrl = `${BASE_URL}/events?user_id=${userId}&role=${role}`;
    return new EventSource(sseUrl);
  },
};
