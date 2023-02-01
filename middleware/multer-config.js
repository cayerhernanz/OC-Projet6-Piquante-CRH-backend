//Mw pour gerer les téléchargées images (multer)
//Importer multer
const multer = require('multer');

//Dictionnaire pour les extensions des images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Configuration de multer
const storage = multer.diskStorage({
    //dossier où iront les images
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },

    //nommage des images (eliminer les espaces blancs dans le nom) et extension de celle-ci (à partir de celle du fichier)
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];

        //Création du nom de l'image(avec une marque de temps)
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Exporter multer
module.exports = multer({storage}).single('image');