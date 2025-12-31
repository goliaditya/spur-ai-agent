import { Router, Request, Response } from "express";
import { generateReply } from "../services/llmService";

const router = Router();

type ChatMessage = {
  sender: "user" | "assistant";
  text: string;
};

router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { history, message } = req.body;

    // Validate and safely cast history
    const safeHistory: ChatMessage[] = Array.isArray(history)
      ? history.filter(
          (m): m is ChatMessage =>
            (m.sender === "user" || m.sender === "assistant") &&
            typeof m.text === "string"
        )
      : [];

    if (typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }

    const reply = await generateReply(safeHistory, message);

    res.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default router;

