const path = require("path");
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.js"),
      name: "MyLib",
      fileName: (format) => `header-bar.${format}.js`,
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
