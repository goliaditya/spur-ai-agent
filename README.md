# Spur – AI Live Chat Support Agent

This project is a small full-stack web application that simulates a customer
support live chat powered by an AI agent. It closely mirrors how Spur’s
real-world AI chat systems work.

Users can send messages via a chat interface, and an AI agent responds using
a real Large Language Model (LLM) while persisting conversation history.

---

## 🧱 Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- SQLite (better-sqlite3)
- OpenAI API

### Frontend
- React (Vite)
- TypeScript
- Fetch API

---

## ✨ Features

- Live chat UI with user and AI messages
- Session-based conversation handling
- Persistent storage of conversations and messages
- Real LLM integration (OpenAI)
- Input validation and guardrails
- Graceful error handling
- Auto-scroll and typing indicator

---

## 🚀 Running Locally

### 1️⃣ Clone the Repository
```bash
git clone <your-github-repo-url>
cd spur-ai-chat
