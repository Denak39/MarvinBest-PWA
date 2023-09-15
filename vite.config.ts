import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

let faviconURL = "/favicon.svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      injectRegister: "script",
      includeAssets: [faviconURL],
      manifest: {
        theme_color: "#ffffff",
        icons: [
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "@admin", replacement: path.resolve(__dirname, "src/admin") },
      { find: "@app", replacement: path.resolve(__dirname, "src/app") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      { find: "@events", replacement: path.resolve(__dirname, "src/events") },
      { find: "@home", replacement: path.resolve(__dirname, "src/home") },
      { find: "@mocks", replacement: path.resolve(__dirname, "src/mocks") },
      {
        find: "@sharedComponents",
        replacement: path.resolve(__dirname, "src/shared/components"),
      },
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
      { find: "@tests", replacement: path.resolve(__dirname, "tests") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
    ],
  },
});
