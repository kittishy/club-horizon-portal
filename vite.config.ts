import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
<<<<<<< HEAD
import { visualizer } from "rollup-plugin-visualizer";
=======
import { componentTagger } from "lovable-tagger";
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
<<<<<<< HEAD
    mode === 'production' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
=======
    mode === 'development' &&
    componentTagger(),
>>>>>>> 5d3ae46afb28d48859273698052cf25058705ae0
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
