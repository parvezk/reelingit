import { pino } from "pino";
import { pinoHttp } from "pino-http";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { service: "reelingit-api" },
});

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.id ?? "unknown",
  customProps: (req) => ({ reqId: req.id }),
});
