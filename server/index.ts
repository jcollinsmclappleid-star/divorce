import { createServer } from "http";
import { createApp } from "./bootstrap";
import { log } from "./log";

(async () => {
  const app = await createApp();

  if (process.env.NODE_ENV !== "production") {
    const httpServer = createServer(app);
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);

    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
      if (process.env.DEV_BYPASS_PAYWALL === "true") {
        log("DEV_BYPASS_PAYWALL=true — paywall disabled for local development", "dev");
      }
    });
    return;
  }

  const httpServer = createServer(app);
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
