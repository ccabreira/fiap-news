import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Define a porta do ambiente de desenvolvimento
  },
  define: {
    "process.env": {},
  },
});



