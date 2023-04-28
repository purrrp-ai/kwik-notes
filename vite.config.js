import react from "@vitejs/plugin-react";
import * as vite from "vite";

// https://vitejs.dev/config/
export default vite.defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": ["./src/assets"],
      "@components": ["./src/components"],
      "@context": ["./src/context"],
      "@data": ["./src/data"],
      "@hooks": ["./src/hooks"],
      "@pages": ["./src/pages"],
      "@services": ["./src/services"],
    },
  },
  server: {
    proxy: {
      "/gwy": {
        target: "http://localhost:8000",
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
