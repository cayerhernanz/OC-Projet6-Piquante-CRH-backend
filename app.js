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
const sauceRoutes = require('./routes/sauces');

//Appel aux routes des différentes fonctionnalités pour l'utilisateur
app.use('api/auth', userRoutes);

//Appel aux routes des différentes fonctionnalités pour les sauces
app.use('api/sauces', sauceRoutes);

//Exportation
module.exports = app;