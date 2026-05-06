import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import auth from "../middleware/authMiddleware.js";
import { uploadVideo, getVideos, deleteVideo } from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", auth, upload.single("video"), uploadVideo);
router.get("/",auth, getVideos);
router.delete("/:id",auth, deleteVideo);

export default router;