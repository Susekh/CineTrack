import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validate =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const err: ZodError<T> = result.error;

      res.status(400).json({
        success: false,
        errors: err.issues.map((issue: typeof err.issues[number]) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    next();
  };
