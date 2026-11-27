import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    watch: { ignored: ["**/public/**"] },
  },
  preview: { host: "127.0.0.1", port: 4173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, "/");
          if (!path.includes("/node_modules/")) return;
          if (path.includes("/node_modules/three/")) return "three";
          if (path.includes("/node_modules/lucide-react/")) return "icons";
          if (
            path.includes("/node_modules/react/") ||
            path.includes("/node_modules/react-dom/") ||
            path.includes("/node_modules/scheduler/")
          ) return "react";
          return "vendor";
        },
      },
    },
  },
});
