import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"; // ✅ kalau ada index.css

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
