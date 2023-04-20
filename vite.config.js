const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.js"),
      name: "ui-header-bar",
      fileName: (format) => `ui-header-bar.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
  test: {
    setupFiles: resolve("test/setup.js"),
  },
});
