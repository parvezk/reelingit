import type { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";

const HEADER = "x-request-id";

export function requestId(req: Request, res: Response, next: NextFunction) {
  const incoming = req.header(HEADER);
  const id = incoming && incoming.length > 0 ? incoming : nanoid(12);
  req.id = id;
  res.setHeader(HEADER, id);
  next();
}
