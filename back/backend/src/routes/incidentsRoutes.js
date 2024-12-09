const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllIncidents, createIncident , deleteIncident} = require('../controllers/incidentsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', getAllIncidents);
router.post('/', upload.single('photo'), createIncident);
router.delete('/:id', authMiddleware, deleteIncident);
module.exports = router;
