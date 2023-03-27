import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/notes": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
