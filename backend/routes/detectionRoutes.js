import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  detectImage,
  detectVideo
} from "../controllers/detectionController.js";

const router = express.Router();

// 🔐 PROTECTED ROUTES
router.post("/image", auth, detectImage);
router.post("/video", auth, detectVideo);

export default router;