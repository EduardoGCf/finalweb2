const pool = require('../db');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, role FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, hashed, role]
    );
    res.json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const update = await pool.query(
      'UPDATE users SET password_hash=$1 WHERE id=$2 RETURNING id, email, role',
      [hashed, id]
    );
    if (update.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};
