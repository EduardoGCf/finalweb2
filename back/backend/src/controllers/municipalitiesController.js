const pool = require('../db');

exports.getAllMunicipalities = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM municipalities');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.createMunicipality = async (req, res) => {
  const { name, coordinates } = req.body;
  try {
    const insert = await pool.query(
      'INSERT INTO municipalities (name, coordinates) VALUES ($1, $2) RETURNING *',
      [name, JSON.stringify(coordinates)]
    );
    res.json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};
