import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};
