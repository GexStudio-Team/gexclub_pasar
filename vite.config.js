import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Relay de cursores entre clientes conectados al dev server. Solo en desarrollo. */
function liveCursorRelay() {
  return {
    name: "gx-live-cursor-relay",
    apply: "serve",
    configureServer(server) {
      server.ws.on("gx-cursor", (payload, client) => {
        for (const other of server.ws.clients) {
          if (other !== client) other.send("gx-cursor", payload);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), liveCursorRelay()],
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
