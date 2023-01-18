//Implémentation express
const express = require('express');
const app = express();

//Implémentation mongoose
const mongoose = require('mongoose');
mongoose.connect('',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Importation des routes
const userRoutes = require('./routes/user');

//Appel aux routes des différentes fonctionnalités
app.use('api/auth', userRoutes);

//Exportation
module.exports = app;