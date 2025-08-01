import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTSConfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), viteTSConfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://amogus22877769.work.gd/api",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
