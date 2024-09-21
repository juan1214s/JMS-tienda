import { Router } from "express";
import { apiChatGPT } from "../controllers/chatGpt/apiChatGpt.mjs";

const router = Router();

router.post('/chatGPT', apiChatGPT)

export default router;