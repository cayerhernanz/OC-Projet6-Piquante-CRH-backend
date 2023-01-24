//Iportation du package fs de Node
const fs = require('fs');

//Importation du model sauces
const Sauce = require('../models/sauces');

//Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {
        res.status(200).json(sauces);
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
}

//Récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.parms.id
    })
    .then((sauce) => {
        res.status(200).json(thing);
    })
    .catch((error) => {
        res.status(404).json({error: error});
    });
};

//Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        /* name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper, */
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => {
        res.status(201).json({message: 'Sauce saved successfully.'});
    })
    .catch((error => {
        res.status(400).json({error: error});
    }));
  };

//MaJ d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    delete sauceObject._userId;
    Sauce.findOne({_id: req.parms.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized.'});
        }
        else{
            Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.parms.id})
            .then(()=> res.status(200).json({message: 'Sauce modified.'}))
            .catch(error => res.status(401).json({error}));
        }
    })
    .catch((error) => {
        res.status(400).json({error});
    }); 
};

//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    //Récuperer la sauce
    Sauce.findOne({_id: req.parms.id})
    .then(sauce => {
        //Vérifier que le propriétaire fait la requette
        if (sauce.userId != req.auth.userId){
            res.status(401).json({message: 'Not authorized.'});
        }
        else{
            //Récuperation du nom du fichier (split dans le repertoire images)
            const filename = thing.imageUrl.split('/images/')[1];
            //Suppression
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.parms.id})
                .then(() => {
                    res.status(200).json({message: 'Sauce deleted.'})
                })
                .catch(error => res.status(401).json({error}));
            });
        }
    })
    .catch( error => {
        res.status(500).json({error});
    });
}

//Liker, Disliker une sauce