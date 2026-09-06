import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/components/index.js"),
      name: "ui-header-bar",
      fileName: (format) => (format === "umd" ? "ui-header-bar.umd.cjs" : "ui-header-bar.es.js"),
    },
    rollupOptions: {
      external: ["vue", "vue-router", "vuestic-ui", "vue3-click-away", "@trevorism/ui-auth"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "vuestic-ui": "VuesticUI",
          "vue3-click-away": "VueClickAway",
          "@trevorism/ui-auth": "TrevorismUiAuth",
        },
      },
    },
  },
  plugins: [tailwindcss(), vue(), cssInjectedByJsPlugin()],
  test: {
    setupFiles: resolve(import.meta.dirname, "test/setup.js"),
  },
});
