import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              marginBottom: "10px",
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: toast.type === "success" ? "#4caf50" : "#f44336",
              color: "#fff",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
