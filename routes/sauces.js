//Mise en place d'express
const express = require('express');

//Création du router
const router = express.Router();

//Importation du MW d'authentification
const auth = require('../middleware/auth');

//Importation de multer
const multer = require('../middleware/multer-config');

//Importation du controlleur sauces
const saucesController = require('../controllers/sauces');

//Création des routes pour les différentes fonctions
router.get('/', auth, saucesController.getAllSauces);
router.post('/', auth, multer, saucesController.createSauce);
router.get('/:id', auth, saucesController.getOneSauce);
router.put('/:id', auth, multer, saucesController.modifySauce);
router.delete('/:id', auth, saucesController.deleteSauce);
router.post('/:id/like', auth, saucesController.likeSauce);

//Exportation
module.exports = router;