//Mise en place d'express
const express = require('express');

//Création du router
const router = express.Router();

//Importation du controlleur utilisateur
const userController = require('../controllers/user');

//Création des routes pour les fonctions signup et login
router.post('/signup', userController.signup);
router.post('/login', userController.login);

//Exportation
module.exports = router;