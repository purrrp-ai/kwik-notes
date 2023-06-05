import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": ["./src/assets"],
      "@components": ["./src/components"],
      "@data": ["./src/data"],
      "@hooks": ["./src/hooks"],
      "@pages": ["./src/pages"],
      "@services": ["./src/services"],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
  },
});
