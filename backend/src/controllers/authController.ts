import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../utils/db/db.js";
import { SignupInput, SigninInput } from "../validators/authSchema.js";
import { handleAsync } from "../utils/handleAsync.js";
import { setTokenCookie } from "../utils/setTokenCookie.js";

export const signup = handleAsync(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body as SignupInput;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    setTokenCookie(res, newUser.id);

    res.status(201).json({
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  },
  "Signup"
);

export const signin = handleAsync(
  async (req: Request, res: Response) => {
    const { email, password } = req.body as SigninInput;

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    setTokenCookie(res, user.id);

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  },
  "Signin"
);


export const getMe = handleAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    res.json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  },
  "GetMe"
);

export const signout = handleAsync(
  async (_req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure : true,
    sameSite: "none",
    });

    res.json({ success: true, message: "Signed out successfully" });
  },
  "Signout"
);