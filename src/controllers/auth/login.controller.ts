import { Request, Response } from "express";
import { prisma } from "../../database";
import { userSchema, userZodSchema } from "../../schemas";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const loginController = async (
  req: Request<{}, {}, userSchema>,
  res: Response
) => {
  const { success, error, data } = userZodSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({ err: error });
    return;
  }

  const userFromDB = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!userFromDB) {
    res.status(404).json({ err: "Invalid credentials" });
    return;
  }

  if (!(await compare(data.password, userFromDB.password))) {
    res.status(401).json({ err: "Invalid credentials" });
    return;
  }

  try {
    const token = sign(
      { id: userFromDB.id, email: userFromDB.email },
      process.env.JWT_SECRET!
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err });
  }
};
