const express = require('express');
const router = express.Router();
const { getAllMunicipalities, createMunicipality } = require('../controllers/municipalitiesController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', getAllMunicipalities);
router.post('/', authMiddleware, createMunicipality);

module.exports = router;
