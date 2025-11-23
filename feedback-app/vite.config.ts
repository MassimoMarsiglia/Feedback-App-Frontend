import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // important for S3 hosting
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
