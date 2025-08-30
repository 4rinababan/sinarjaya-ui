// src/context/NotificationContext.js
import React, { createContext, useState, useEffect } from "react";
import useSound from "use-sound";
import notifSound from "/assets/notif.wav";

import { getSavedUser, getUserFromToken } from "../utils/storage";
import { eventService } from "../api/eventService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [play] = useSound(notifSound);

  // const user = getSavedUser();
  // const decoded = getUserFromToken();
  // console.log(user);
  // console.log(decoded);
  useEffect(() => {
    const user = getUserFromToken(); // ✅ ambil dari storage helper
    const decode = getSavedUser();
    const userId = user?.user_id || "guest";
    const role = user?.role || "guest";

    // gunakan service buat bikin SSE
    const eventSource = eventService.subscribe(userId, role);

    eventSource.onopen = () => {
      // console.log(`🔌 SSE connected as ${role}`); // SSE
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        play();

        setNotifications((prev) => [
          {
            ...data,
            id: Date.now(),
            read: false,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      } catch (err) {}
    };

    eventSource.onerror = (err) => {};

    return () => {
      eventSource.close();
    };
  }, [play]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
