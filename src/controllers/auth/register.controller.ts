import { Request, Response } from "express";
import { hash, genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";

import { userSchema, userZodSchema } from "../../schemas";
import { prisma } from "../../database";

export const registerController = async (
  req: Request<{}, {}, userSchema>,
  res: Response
) => {
  const { success, error, data } = userZodSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({ err: error });
    return;
  }

  const password = await hash(data.password, await genSalt(12));

  try {
    const createdUser = await prisma.user.create({
      data: { email: data.email, password },
    });

    const token = sign(
      { id: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET!
    );

    res.status(201).json({ token });
  } catch (err) {
    if (
      Object.getPrototypeOf(err).constructor.name ===
      "PrismaClientKnownRequestError"
    )
      res.status(409).json({ err: "User with given email already exists" });
    else res.status(500).json({ err: "Internal server error" });
  }
};
