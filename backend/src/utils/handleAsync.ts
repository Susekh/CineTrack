import { Request, Response, NextFunction } from "express";

export const handleAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>, section: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.error(`Error in [${section}]:`, error.message || error);
      res.status(500).json({
        success: false,
        section,
        message: error?.message || "Internal Server Error.",
      });
    }
  };
