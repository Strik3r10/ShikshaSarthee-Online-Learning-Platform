// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Use FRONTEND_URL if present, otherwise fallback to localhost dev origin
const allowedOrigin = process.env.FRONTEND_URL || process.env.CORS || "http://localhost:5173";
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Your routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter);

import teacherRouter from "./routes/teacher.routes.js";
app.use("/api/teacher", teacherRouter);

import courseRouter from "./routes/course.routes.js";
app.use("/api/course", courseRouter);

import adminRouter from "./routes/admin.routes.js";
app.use("/api/admin", adminRouter);

import paymentRouter from "./routes/payment.routes.js";
app.use("/api/payment", paymentRouter);

// Root route - quick confirmation or redirect to frontend
app.get("/", (req, res) => {
  // Option: redirect to front end
  // return res.redirect(process.env.FRONTEND_URL || "https://shiksha-sarthee-online-learning-pla.vercel.app");

  // Simple message for API
  return res.status(200).send("elearning backend is up. Visit /_health for health checks.");
});

// Health check for Render
app.get("/_health", (req, res) => {
  return res.status(200).json({ ok: true, ts: Date.now() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && (err.stack || err));
  res.status(500).json({ error: "Internal Server Error" });
});

export { app };
