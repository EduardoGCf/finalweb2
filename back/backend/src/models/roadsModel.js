
const pool = require('../db');

exports.findAll = async () => {
  const result = await pool.query('SELECT * FROM roads');
  return result.rows;
};
