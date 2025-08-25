import * as Sentry from "@sentry/node";
import { ENV } from "./src/config/env.js";

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  environment: ENV.NODE_ENV || "development",
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  includeLocalVariables: true,
  sendDefaultPii: true,
});

// 👇 Global bana de taaki server.js me direct use ho jaye
global.Sentry = Sentry;

console.log("✅ Sentry instrumentation loaded");
