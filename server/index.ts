import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/index.ts';
import { generateMotivation } from './services/ai.ts';

// Load environment config
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Users endpoint (returns default profile configured in schema)
app.get('/api/profile', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = 1').get();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new walking session
app.post('/api/sessions', async (req, res) => {
  const { walkingTime, restingTime, steps, distance, painLevel } = req.body;
  
  try {
    const stmt = db.prepare(`
      INSERT INTO walking_sessions (user_id, walking_time, resting_time, steps, distance, pain_level)
      VALUES (1, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(walkingTime, restingTime, steps, distance, painLevel);
    
    // Once saved, generate contextual motivation message
    const aiMotivation = await generateMotivation({
      walkingTime, restingTime, steps, distance, painLevel
    });
    
    res.json({ 
      success: true, 
      id: result.lastInsertRowid, 
      message: aiMotivation 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record session' });
  }
});

// Fetch historical walking sessions
app.get('/api/sessions', (req, res) => {
  try {
    const sessions = db.prepare('SELECT * FROM walking_sessions WHERE user_id = 1 ORDER BY created_at DESC').all();
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
