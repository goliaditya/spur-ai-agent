import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
You are a helpful customer support agent for a small e-commerce store.

Store information:
- Shipping: We ship worldwide. Delivery takes 5–10 business days.
- Returns: Returns accepted within 14 days of delivery for unused items.
- Support hours: Monday to Friday, 9 AM – 6 PM IST.

Answer clearly, politely, and concisely.
`;

export async function generateReply(
  history: { sender: string; text: string }[],
  userMessage: string
): Promise<string> {
  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 200,
      temperature: 0.3
    });

    return (
      completion.choices[0].message.content ??
      "Sorry, I couldn’t generate a response."
    );
  } catch (error) {
    console.error("LLM error:", error);
    throw new Error("AI service failed");
  }
}
