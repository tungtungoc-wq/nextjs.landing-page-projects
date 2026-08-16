import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database file path
const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'registrations.db');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Create registrations table
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    level TEXT,
    course TEXT,
    message TEXT,
    registration_type TEXT DEFAULT 'full',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT
  )
`);

// Create index for faster queries
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_created_at ON registrations(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_email ON registrations(email);
`);

export interface Registration {
  id?: number;
  name: string;
  email: string;
  phone: string;
  level?: string;
  course?: string;
  message?: string;
  registration_type?: string;
  created_at?: string;
  ip_address?: string;
  user_agent?: string;
}

// Insert new registration
export function insertRegistration(data: Registration): number {
  const stmt = db.prepare(`
    INSERT INTO registrations (name, email, phone, level, course, message, registration_type, ip_address, user_agent)
    VALUES (@name, @email, @phone, @level, @course, @message, @registration_type, @ip_address, @user_agent)
  `);

  const info = stmt.run(data);
  return info.lastInsertRowid as number;
}

// Get all registrations
export function getAllRegistrations(): Registration[] {
  const stmt = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC');
  return stmt.all() as Registration[];
}

// Get registration by ID
export function getRegistrationById(id: number): Registration | undefined {
  const stmt = db.prepare('SELECT * FROM registrations WHERE id = ?');
  return stmt.get(id) as Registration | undefined;
}

// Get registrations count
export function getRegistrationsCount(): number {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM registrations');
  const result = stmt.get() as { count: number };
  return result.count;
}

// Get recent registrations (last N)
export function getRecentRegistrations(limit: number = 10): Registration[] {
  const stmt = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC LIMIT ?');
  return stmt.all(limit) as Registration[];
}

// Search registrations by email
export function searchByEmail(email: string): Registration[] {
  const stmt = db.prepare('SELECT * FROM registrations WHERE email LIKE ? ORDER BY created_at DESC');
  return stmt.all(`%${email}%`) as Registration[];
}

// Delete registration by ID
export function deleteRegistration(id: number): boolean {
  const stmt = db.prepare('DELETE FROM registrations WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

// Get statistics
export function getStatistics() {
  const total = getRegistrationsCount();

  const todayStmt = db.prepare(`
    SELECT COUNT(*) as count
    FROM registrations
    WHERE DATE(created_at) = DATE('now')
  `);
  const today = (todayStmt.get() as { count: number }).count;

  const weekStmt = db.prepare(`
    SELECT COUNT(*) as count
    FROM registrations
    WHERE created_at >= datetime('now', '-7 days')
  `);
  const week = (weekStmt.get() as { count: number }).count;

  const monthStmt = db.prepare(`
    SELECT COUNT(*) as count
    FROM registrations
    WHERE created_at >= datetime('now', '-30 days')
  `);
  const month = (monthStmt.get() as { count: number }).count;

  return { total, today, week, month };
}

export default db;
