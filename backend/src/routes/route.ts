import { Router } from "express";
import apiRoutes from "./api.route.js";

const router = Router();

router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/", (_req, res) => {
    res.json({status : "online", msg : "server working fine"});
});
router.use("/api", apiRoutes);

export default router;