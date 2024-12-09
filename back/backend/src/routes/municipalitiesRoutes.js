const express = require('express');
const router = express.Router();
const { getAllMunicipalities,deleteMunicipality, createMunicipality } = require('../controllers/municipalitiesController');
const { authMiddleware} = require('../middlewares/authMiddleware');

router.get('/', getAllMunicipalities);
router.post('/', authMiddleware, createMunicipality);
router.delete('/:id', authMiddleware, deleteMunicipality);
module.exports = router;
