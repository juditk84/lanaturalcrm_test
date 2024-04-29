import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import compress from 'vite-plugin-compress'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), compress()],
  server: {

    proxy: {
      "/api": {
        target: "http://localhost:4000/",
        changeOrigin: true,
        secure: false,
      },
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
