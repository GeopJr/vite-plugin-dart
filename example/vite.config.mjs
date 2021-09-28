import { defineConfig } from "vite";
import Dart from "../src/index.js";

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
        input: "./index.html",
      },
    },
  };
});
