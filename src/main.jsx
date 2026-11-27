import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if (import.meta.env.DEV) {
  import("./cursorSync").then(({ initCursorSync }) => initCursorSync());
}

createRoot(document.getElementById("root")).render(<App />);
