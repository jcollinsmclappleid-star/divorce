import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let appPromise;

async function getApp() {
  if (!appPromise) {
    process.env.VERCEL = "1";
    process.env.NODE_ENV = process.env.NODE_ENV || "production";

    const { createApp } = require("../dist/bootstrap.cjs");
    appPromise = createApp();
  }

  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
}
