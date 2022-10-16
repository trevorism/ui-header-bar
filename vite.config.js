const path = require("path");
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.js"),
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
});
