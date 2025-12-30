import Database from "better-sqlite3";

// Create or open SQLite database file
export const db = new Database("chat.db");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversationId TEXT NOT NULL,
    sender TEXT CHECK(sender IN ('user', 'ai')),
    text TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversationId) REFERENCES conversations(id)
  );
`);
