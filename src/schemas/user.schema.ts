import z from "zod";

export const userZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type userSchema = z.infer<typeof userZodSchema>;
