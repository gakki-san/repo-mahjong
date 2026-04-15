import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined;
          }

          if (id.includes("@chakra-ui") || id.includes("@emotion")) {
            return "chakra-vendor";
          }

          if (id.includes("react-router")) {
            return "router-vendor";
          }

          if (id.includes("jotai")) {
            return "state-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
