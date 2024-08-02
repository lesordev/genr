import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/global.css";
import { Routes } from "@genr/dirouted";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
