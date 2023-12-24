import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

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
  plugins: [vue(), cssInjectedByJsPlugin()],
  test: {
    setupFiles: resolve("test/setup.js"),
  },
});
