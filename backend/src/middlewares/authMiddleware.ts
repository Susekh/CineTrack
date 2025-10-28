import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import db from "../utils/db/db.js";
import { handleAsync } from "../utils/handleAsync.js";

interface DecodedToken extends JwtPayload {
  id: number;
}

export const protect = handleAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const token = req.cookies?.token;

    console.log("cookies", req.cookies?.token);
    

    if (!token) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await db.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    req.user = user;
    next();
  },
  "auth-protect"
);
