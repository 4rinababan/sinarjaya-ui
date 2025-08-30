import React, { useState } from "react";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block w-48">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          open,
          setOpen,
          value,
          onValueChange,
        })
      )}
    </div>
  );
}

export function SelectTrigger({ children, setOpen }) {
  return (
    <div
      className="border rounded px-3 py-2 w-full bg-white flex justify-between items-center cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    >
      {children}
      <span className="ml-2">▼</span>
    </div>
  );
}

export function SelectContent({ children, open }) {
  if (!open) return null;
  return (
    <div className="absolute mt-1 w-full bg-white border rounded shadow z-50">
      {children}
    </div>
  );
}

export function SelectItem({ children, value, onValueChange, setOpen }) {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
    >
      {children}
    </div>
  );
}

export function SelectValue({ value, placeholder }) {
  return <span>{value || placeholder}</span>;
}
