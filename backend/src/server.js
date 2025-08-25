import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Debug Sentry route
app.get("/debug-sentry", (req, res) => {
  throw new Error("First Sentry error");
});

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

// ✅ Sentry error handler (use global.Sentry)
if (global.Sentry) {
  global.Sentry.setupExpressErrorHandler(app);
}

// Start server
const startServer = async () => {
  try {
    await connectDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`🚀 Server running on port ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting the server", error);
    process.exit(1);
  }
};

startServer();

export default app;
