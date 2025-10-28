import { Response } from "express";
import { generateToken } from "./token.js";

const TOKEN_EXPIRY = 7 * 24 * 60 * 60;

export const setTokenCookie = (res: Response, userId: number) => {
  const token = generateToken(userId);
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure : true,
    sameSite: "none",
    maxAge: TOKEN_EXPIRY * 1000, 
  });
};
