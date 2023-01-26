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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        //Création des éléments like vides
        likes: 0,
        dislikes: 0,
        usersLiked: [''],
        usersDisliked: [''],
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
exports.likeSauce = (req, res, next) => {
    //Récupérer les éléments du corps de la rquette (utilisayeur, sauce, et interaction)
    let targetSauce = req.parms.id;
    let user = req.body.userId;
    let like = req.body.like;

    //Comparer la valeur de like
    switch(like){

        //Dans le cas d'un like (= 1)
        case 1 :
            //MaJ la sauce (ajouter le like et ajouter l'utlisateur au tableau usersLiked)
            Sauce.updateOne({_id: targetSauce}, {$push: {usersLiked: user}, $inc: {likes: +1}})
            .then(() => res.status(200).json({message: 'Like'}))
            .catch((error) => res.status(400).json({error}))
        break;

        //Dans le cas d'enlever le like ou le dislike (= 0)
        case 0 :
            //Récupérer la sauce
            Sauce.findOne({_id: targetSauce})
            .then((sauce) => {
                //Le cas du like : MaJ du tableau usersLiked (enlever l'utilisateur du tableau et enlever le like)
                if(sauce.usersLiked.includes(user)) {
                    Sauce.updateOne({_id: targetSauce}, {$pull: {usersLiked: user}, $inc: {likes: -1}})
                    .then(() => res.status(200).json({message: 'Unliked'}))
                    .catch((error) => res.status(400).json({error}))
                }

                //Le cas du dislike: Maj du tableau usersDisliked (enlever l'utiliateur du tableau et le dislike)
                if(sauce.usersDisliked.includes(user)) {
                    Sauce.updateOne({_id: targetSauce}, {$pull: {usersDisliked: user}, $inc: {dislikes: -1}})
                    .then(() => res.status(200).json({message: 'Undisliked'}))
                    .catch((error) => res.status(400).json({error}))
                }
            })
        break;

        //Dans le cas d'un dislike (= -1)
        case -1 :
            //MaJ la sauce (ajouté le like et ajouter l'utlisateur au tableau usersDisliked)
            Sauce.updateOne({_id: targetSauce},{$push: {usersDisliked: user}, $inc: {dislikes: +1}})
            .then(() => res.status(200).json({message: 'Dislike'}))
            .catch((error) => res.status(400).json({error}))
        break;
    }
}