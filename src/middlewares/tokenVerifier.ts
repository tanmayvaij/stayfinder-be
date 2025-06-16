import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const tokenVerifier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ err: "Token not provided" });
    return;
  }
  try {
    req.user = verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET!
    ) as JwtPayload;

    next();
  } catch (err) {
    res.status(500).json({ err: "Invalid Token" });
  }
};
