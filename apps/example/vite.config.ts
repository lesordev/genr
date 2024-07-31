import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirouted } from "@genr/dirouted";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dirouted()],
});
