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
router.get('/', saucesController.getAllSauces);
router.post('/', multer, saucesController.createSauce);
router.get('/:id', saucesController.getOneSauce);
router.put('/:id', multer, saucesController.modifySauce);
router.delete('/:id', saucesController.deleteSauce);
router.post('/:id/like', saucesController.likeSauce);

//Exportation
module.exports = router;