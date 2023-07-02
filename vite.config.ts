import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "h3-yup",
      fileName: "h3-yup",
    },
  },
});
