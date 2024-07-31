import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Routes } from "@genr/dirouted";

import "@/styles/global.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
