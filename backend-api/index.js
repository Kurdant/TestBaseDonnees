const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express(); // <<< Là tu déclares app correctement

const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour le CORS
app.use(cors());

// Pour exposer ton dossier images directement
app.use('/images', express.static(path.join(__dirname, 'images')));

// Tes routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Si tu avais un routeur pour images (inutile ici, mais si tu veux laisser ton routes/image.js, OK)
const imageRoutes = require('./routes/image');
app.use('/images', imageRoutes);

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
