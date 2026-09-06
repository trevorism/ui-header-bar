import { defineConfig } from "vite";
import baseConfig from "./vite.config.js";

const adminSession = {
  authenticated: true,
  username: "admin@trevorism.com",
  role: "admin",
  permissions: "CRUDE",
  tenant: null,
  admin: true,
  expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

const stubAuthBackend = {
  name: "stub-auth-backend",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url.startsWith("/api/auth/")) {
        return next();
      }
      res.setHeader("Content-Type", "application/json");
      if (req.url.startsWith("/api/auth/logout")) {
        res.end(JSON.stringify({ logoutUrl: "/" }));
        return;
      }
      res.end(JSON.stringify(adminSession));
    });
  },
};

export default defineConfig({
  ...baseConfig,
  plugins: [...baseConfig.plugins, stubAuthBackend],
});
