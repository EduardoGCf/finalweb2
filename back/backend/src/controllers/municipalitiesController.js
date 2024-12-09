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
exports.deleteMunicipality = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM municipalities WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }
    res.json({ message: 'Municipio eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el municipio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
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
