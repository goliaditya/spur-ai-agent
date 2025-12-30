import { db } from "../db/database";
import { v4 as uuidv4 } from "uuid";
import { Sender } from "../types";

/**
 * Creates a new conversation and returns its ID
 */
export function createConversation(): string {
  const id = uuidv4();

  db.prepare(
    "INSERT INTO conversations (id) VALUES (?)"
  ).run(id);

  return id;
}

/**
 * Saves a message (user or AI) to the database
 */
export function saveMessage(
  conversationId: string,
  sender: Sender,
  text: string
) {
  db.prepare(`
    INSERT INTO messages (id, conversationId, sender, text)
    VALUES (?, ?, ?, ?)
  `).run(uuidv4(), conversationId, sender, text);
}

/**
 * Fetches recent conversation history
 */
export function getConversationHistory(conversationId: string) {
  return db.prepare(`
    SELECT sender, text
    FROM messages
    WHERE conversationId = ?
    ORDER BY createdAt ASC
    LIMIT 20
  `).all(conversationId);
}
