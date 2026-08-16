import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/components/index.js"),
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
  plugins: [tailwindcss(), vue(), cssInjectedByJsPlugin()],
  test: {
    setupFiles: resolve(import.meta.dirname, "test/setup.js"),
  },
});
