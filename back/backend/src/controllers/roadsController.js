const pool = require('../db');

exports.getAllRoads = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roads');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.getRoadById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM roads WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.createRoad = async (req, res) => {
  const { name, origin_municipality_id, destination_municipality_id, points = [] } = req.body
  try {
    const insert = await pool.query(
      'INSERT INTO roads (name, origin_municipality_id, destination_municipality_id, points) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, origin_municipality_id, destination_municipality_id, JSON.stringify(points)]
    );
    res.json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateRoad = async (req, res) => {
  const { id } = req.params;
  const { name, origin_municipality_id, destination_municipality_id, points } = req.body;
  try {
    const update = await pool.query(
      'UPDATE roads SET name=$1, origin_municipality_id=$2, destination_municipality_id=$3, points=$4 WHERE id=$5 RETURNING *',
      [name, origin_municipality_id, destination_municipality_id, JSON.stringify(points), id]
    );
    if (update.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(update.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};

exports.deleteRoad = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await pool.query('DELETE FROM roads WHERE id=$1 RETURNING *', [id]);
    if (del.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Carretera eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};
