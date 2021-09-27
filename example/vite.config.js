import { defineConfig } from "vite";
import { resolve } from "path";
import Dart from "../src/index";

export default defineConfig(({ _, mode }) => {
  return {
    plugins: [
      Dart({
        O: mode === "development" ? 1 : 2,
        dart: process.env.VERCEL ? "./dart-sdk/bin/dart" : "dart",
      }),
    ],
    base: "./",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
  };
});
