import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express(); // 👈 pehle declare

// Middlewares
app.use(express.json());
app.use(clerkMiddleware());

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    // don’t run express.listen in Vercel
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server running on port ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting the server", error);
    process.exit(1);
  }
};

startServer();

export default app;
