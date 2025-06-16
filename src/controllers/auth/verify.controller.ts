import { Request, Response } from "express";

export const verifyController = (req: Request, res: Response) => {
  res.json(req.user);
};
