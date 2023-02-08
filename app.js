//Implémentation express
const express = require('express');
const app = express();
const path = require('path');

//Implémentation de helmet pour la sécurité
const helmet = require('helmet');

//Implémentation Cors (à enlever lors de la mise en place du vrai serveur)
const cors = require('cors');

//Accepter json
app.use(express.json());

//Lancer helmet
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
})
);

//Lancer Cors pour eviter erreurs de type CORS
app.use(cors());

//Rendre accessible les images
app.use('/images/', express.static(path.join(__dirname, 'images')));


//Implémenter dotenv
require('dotenv').config();

//Créer la variable des creds mongodb
const mongoCred = process.env.MONGO_DB;

//Implémentation mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
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