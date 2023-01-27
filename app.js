//Implémentation express
const express = require('express');
const app = express();

//Accepter json
app.use(express.json());

//dotenv
require('dotenv').config();

//Créer la variable des creds mongodb
const mongoCred = process.env.MONGO_DB;

//Authotiser différents ports (pour eviter erreur CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  next();
})

//Implémentation mongoose
const mongoose = require('mongoose');
mongoose.connect(mongoCred,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');

//Appel aux routes des différentes fonctionnalités pour l'utilisateur
app.use('/api/auth', userRoutes);

//Appel aux routes des différentes fonctionnalités pour les sauces
app.use('/api/sauces', sauceRoutes);

//Exportation
module.exports = app;