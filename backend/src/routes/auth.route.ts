import express from "express";
import { signup, signin, getMe, signout } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { signupSchema, signinSchema } from "../validators/authSchema.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.post("/signout", protect, signout);
router.get("/me", protect, getMe);

export default router;
