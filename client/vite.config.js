/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: true,
      port: env.VITE_PORT,
      https: env.VITE_HTTPS == "true" ? true : false,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react()],
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
  };
});
