import { Router } from "express";
import authRoutes from "./auth.route.js";
import entryRoutes from "./entry.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/entry", entryRoutes)

export default router;