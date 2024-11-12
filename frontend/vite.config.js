import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: { babelrc: true },
    }),
  ],
  optimizeDeps: {
    include: ["react-scroll-parallax"],
  },
  build: {
    sourcemap: false,
    outDir: "dist",
    rollupOptions: {
      external: [],
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
});
