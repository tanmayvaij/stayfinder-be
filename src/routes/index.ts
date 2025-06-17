import { Router } from "express";
import { authRouter } from "./auth.route";
import { propertyRouter } from "./property.route";

export const rootRouter = Router();

rootRouter
  .use("/auth", authRouter)
  .use("/property", propertyRouter)
