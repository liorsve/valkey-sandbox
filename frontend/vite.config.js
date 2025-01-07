import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/appws": {
        target: "ws://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
    fs: {
      strict: false,
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  optimizeDeps: {
    include: ["vue", "@guolao/vue-monaco-editor"],
    exclude: ["@vueuse/core"],
  },
  preview: {
    port: 8080,
    host: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "public",
  build: {
    assetsDir: "assets",
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue"],
          editor: ["@guolao/vue-monaco-editor"],
          common: ["marked", "dompurify"],
          ws: ["reconnecting-websocket"],
          core: ["vue-virtual", "@tanstack/vue-virtual"],
          "docs-core": ["markdown-it", "dompurify"],
          "docs-plugins": [
            "markdown-it-abbr",
            "markdown-it-anchor",
            "markdown-it-emoji",
            "markdown-it-footnote",
            "markdown-it-highlight",
            "markdown-it-sub",
            "markdown-it-sup",
            "markdown-it-task-lists",
            "markdown-it-toc-done-right",
          ],
          "docs-styles": ["components/helpfulresources/styles/markdown.css"],
          "docs-utils": [
            "utils/markdownRenderer",
            "services/documentationService",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    target: "esnext",
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
  assetsInclude: ["**/*.md"],
});
