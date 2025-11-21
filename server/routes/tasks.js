const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC', [req.user.id]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tasks (user_id,title,description) VALUES ($1,$2,$3) RETURNING *',
      [req.user.id, title, description]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { completed } = req.body;
  try {
    const result = await db.query(
      'UPDATE tasks SET completed=$1 WHERE id=$2 AND user_id=$3 RETURNING *',
      [completed, req.params.id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

