require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roadsRoutes = require('./routes/roadsRoutes');
const municipalitiesRoutes = require('./routes/municipalitiesRoutes');
const incidentsRoutes = require('./routes/incidentsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/roads', roadsRoutes);
app.use('/municipalities', municipalitiesRoutes);
app.use('/incidents', incidentsRoutes);
app.use('/users', usersRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
