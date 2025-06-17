import { Router } from "express";
import { getProperties, getPropertyById, addProperty } from "../controllers";
import { uploadSingleFile } from "../middlewares";

export const propertyRouter = Router();

propertyRouter
  .route("/")
  .get(getProperties)
  .post(uploadSingleFile(), addProperty);

propertyRouter.route("/:id").get(getPropertyById);
