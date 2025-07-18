import { Router } from "express";
import { apiChatGPT } from "../controllers/chatGpt/apiChatGpt.mjs";
import { authMiddleware } from "../JWT/authMiddleware.mjs";

const router = Router();

router.post('/chatGPT/:user_id',  authMiddleware, apiChatGPT)

export default router;