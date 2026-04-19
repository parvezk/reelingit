import express from "express";
import cors from "cors";
import { requestId } from "./middleware/requestId.js";
import { httpLogger, logger } from "./middleware/logger.js";

const envOr = (value: string | undefined, fallback: string) =>
  value && value.length > 0 ? value : fallback;

const PORT = Number(envOr(process.env.PORT, "4002"));
const CORS_ORIGIN = envOr(process.env.CORS_ORIGIN, "http://localhost:3000");

const app = express();

app.use(requestId);
app.use(httpLogger);
app.use(cors({ origin: CORS_ORIGIN, exposedHeaders: ["x-request-id"] }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

const server = app.listen(PORT, () => {
  logger.info({ port: PORT, corsOrigin: CORS_ORIGIN }, "api listening");
});

const shutdown = (signal: string) => {
  logger.info({ signal }, "shutting down");
  server.close(() => process.exit(0));
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
