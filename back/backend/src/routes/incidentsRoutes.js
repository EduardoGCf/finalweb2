const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllIncidents, createIncident } = require('../controllers/incidentsController');

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

module.exports = router;
