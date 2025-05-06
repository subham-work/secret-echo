import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getMessages);
router.post("/", protect, sendMessage);

export default router;
