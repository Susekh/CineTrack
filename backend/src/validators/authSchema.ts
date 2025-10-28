import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(passwordRegex, "Password must contain at least one uppercase letter and one special character"),
});

export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
