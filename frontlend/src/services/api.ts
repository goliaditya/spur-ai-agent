const API_URL = "http://localhost:3001/chat/message";

export async function sendMessage(
  message: string,
  sessionId?: string
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, sessionId })
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
