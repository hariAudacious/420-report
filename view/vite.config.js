import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
  },
  define: { "process.env": process.env },
});
