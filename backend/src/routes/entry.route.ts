import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/entryController.js";

const router = express.Router();

// Protecting all routes - user must be logged in
router.use(protect);

router.post("/", createEntry);
router.get("/", getEntries);
router.get("/:id", getEntryById);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
