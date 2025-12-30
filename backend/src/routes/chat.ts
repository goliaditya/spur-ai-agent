import { Router } from "express";
import { z } from "zod";
import {
  createConversation,
  saveMessage,
  getConversationHistory
} from "../services/conversationService";
import { generateReply } from "../services/llmService";

const router = Router();

const requestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000),
  sessionId: z.string().optional()
});

router.post("/message", async (req, res) => {
  try {
    const parsed = requestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const { message, sessionId } = parsed.data;

    const conversationId = sessionId || createConversation();

    // Save user message
    saveMessage(conversationId, "user", message);

    // Get conversation history
    const history = getConversationHistory(conversationId);

    // Generate AI reply
    const reply = await generateReply(history, message);

    // Save AI reply
    saveMessage(conversationId, "ai", reply);

    res.json({
      reply,
      sessionId: conversationId
    });
  } catch (error) {
    console.error("Chat route error:", error);
    res.status(500).json({
      reply:
        "Sorry, something went wrong on our side. Please try again later."
    });
  }
});

export default router;
