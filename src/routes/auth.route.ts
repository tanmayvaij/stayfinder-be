import { Router } from "express";
import {
  registerController,
  loginController,
  verifyController,
} from "../controllers";
import { tokenVerifier } from "../middlewares";

export const authRouter = Router();

authRouter.route("/register").post(registerController);

authRouter.route("/login").post(loginController);

authRouter.route("/verify").get(tokenVerifier, verifyController);
