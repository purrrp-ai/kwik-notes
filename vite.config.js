import react from "@vitejs/plugin-react";
import * as vite from "vite";

// https://vitejs.dev/config/
export default vite.defineConfig({
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
