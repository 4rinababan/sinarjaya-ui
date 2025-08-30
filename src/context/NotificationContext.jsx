import React, { createContext, useState, useEffect } from "react";
import useSound from "use-sound";
import notifSound from "/assets/notif.wav";

import { getSavedUser, getUserFromToken } from "../utils/storage";
import { eventService } from "../api/eventService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [play] = useSound(notifSound);

  useEffect(() => {
    const user = getUserFromToken();
    const userId = user?.user_id || "guest";
    const role = user?.role || "guest";

    // SSE Subscribe
    const eventSource = eventService.subscribe(userId, role);

    eventSource.onopen = () => {
      // console.log(`🔌 SSE connected as ${role}`);
    };

    // Autoplay fix for Chrome: aktifkan AudioContext setelah user gesture
    const enableSound = () => {
      play(); // memaksa audio context resume
      window.removeEventListener("click", enableSound);
    };
    window.addEventListener("click", enableSound);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        play(); // mainkan suara notif

        setNotifications((prev) => [
          {
            ...data,
            id: Date.now(),
            read: false,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      } catch (err) {
        console.error("Error parsing SSE message:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
    };

    // Cleanup
    return () => {
      eventSource.close();
      window.removeEventListener("click", enableSound);
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
