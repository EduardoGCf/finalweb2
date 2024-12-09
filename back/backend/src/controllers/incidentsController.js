const pool = require('../db');

exports.getAllIncidents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM incidents');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al obtener incidentes.' });
  }
};

exports.createIncident = async (req, res) => {
  const { type, reason, coordinates } = req.body;

  let coords;
  try {
    coords = JSON.parse(coordinates);
  } catch (error) {
    return res.status(400).json({ error: 'Coordenadas inválidas. Debe ser un JSON válido.' });
  }

  if (!type || !reason || !coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos. Se requiere type, reason y coordinates {lat, lng}.' });
  }

  let photoPath = null;
  if (req.file) {
    photoPath = '/uploads/' + req.file.filename;
  }

  try {
    const insert = await pool.query(
      'INSERT INTO incidents (type, reason, coordinates, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, reason, JSON.stringify(coords), photoPath]
    );
    res.json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al crear el incidente.' });
  }
};
