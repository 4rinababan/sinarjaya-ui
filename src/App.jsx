// src/App.jsx
import React from "react";
import Routes from "./Routes";
import { NotificationProvider } from "./context/NotificationContext";
import { ToastProvider } from "./context/ToastProvider";

function App() {
  return (
    <NotificationProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </NotificationProvider>
  );
}

export default App;
