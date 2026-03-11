CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  age INTEGER NOT NULL,
  vcm REAL NOT NULL,
  hr_reserve INTEGER NOT NULL,
  target_steps INTEGER NOT NULL,
  target_distance INTEGER NOT NULL,
  target_time INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS walking_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  walking_time INTEGER NOT NULL,
  resting_time INTEGER NOT NULL,
  steps INTEGER NOT NULL,
  distance REAL NOT NULL,
  pain_level INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert a default user if none exists
INSERT INTO users (id, age, vcm, hr_reserve, target_steps, target_distance, target_time)
SELECT 1, 75, 1.2, 120, 4500, 3000, 3600
WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = 1);
