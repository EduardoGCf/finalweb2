const express = require('express');
const router = express.Router();
const { getAllRoads, getRoadById, createRoad, updateRoad, deleteRoad } = require('../controllers/roadsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', getAllRoads);
router.get('/:id', getRoadById);

router.post('/', authMiddleware, createRoad);
router.put('/:id', authMiddleware, updateRoad);
router.delete('/:id', authMiddleware, deleteRoad);

module.exports = router;
