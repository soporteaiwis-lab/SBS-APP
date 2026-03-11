import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize DB inside the database.sqlite file (or inside memory if desired)
const db = new Database('database.sqlite', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Execute initialization schema
const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

export default db;
