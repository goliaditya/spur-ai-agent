import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/api";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const response = await sendMessage(userText, sessionId);
      setSessionId(response.sessionId);
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: response.reply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, index) => (
          <div key={index} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="message ai typing">
            Agent is typing…
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-bar">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
