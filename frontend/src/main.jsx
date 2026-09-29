// FILE: main.jsx
// This file starts React and places the <App /> component inside index.html.
// Flow: index.html -> (main.jsx) -> App.jsx -> components

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);