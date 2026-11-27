import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Avisa al navegador solo cuando cambia un archivo real. Solo en desarrollo. */
function agentWorkCursor() {
  return {
    name: "gx-agent-work-cursor",
    apply: "serve",
    configureServer(server) {
      const relevant = /\.(jsx?|css|html|md|json)$/;
      let timer = null;
      let pending = null;

      const notify = (file) => {
        const rel = path.relative(process.cwd(), file).replace(/\\/g, "/");
        if (rel.startsWith("dist/") || rel.startsWith("node_modules/") || rel.startsWith("public/")) return;
        if (!relevant.test(rel)) return;
        pending = rel;
        clearTimeout(timer);
        timer = setTimeout(() => {
          server.ws.send({
            type: "custom",
            event: "gx-work",
            data: { file: pending, at: Date.now() },
          });
          pending = null;
        }, 140);
      };

      server.watcher.on("change", notify);
      server.watcher.on("add", notify);
      server.watcher.on("unlink", notify);
    },
  };
}

export default defineConfig({
  plugins: [react(), agentWorkCursor()],
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
