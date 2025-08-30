import React from "react";

export function Table({ children, className }) {
  return (
    <table className={`w-full border-collapse ${className || ""}`}>
      {children}
    </table>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="text-left py-3 px-4 font-semibold text-gray-600">
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }) {
  return <td className="py-3 px-4 text-gray-700">{children}</td>;
}
