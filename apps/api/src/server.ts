import express from "express";
import cors from "cors";

const PORT = Number(process.env.PORT ?? 4002);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:3000";

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

const server = app.listen(PORT, () => {
  console.log(`api listening on :${PORT} (cors: ${CORS_ORIGIN})`);
});

const shutdown = (signal: string) => {
  console.log(`received ${signal}, shutting down`);
  server.close(() => process.exit(0));
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
