//Controlleurs pour les fonctionalités d'utlisateur
//Impportation de bcrypt
const bcrypt = require('bcrypt');

//Importation de jsonwebtoken
const jsonWT= require('jsonwebtoken');

//Importation de dotenv
require('dotenv').config();

//Créer la variable de token secret
const tokenKey = process.env.RANDOM_TOKEN_SECRET;

//Importation du model utilisateur
const User = require('../models/user')

//Fonction signup pour créer un compte
exports.signup = (req, res, next) => {
    //Hashage du password à 10 tours et création de l'objet user
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });

        //Enregistrement de l'objet user
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée.'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

//Fonction login pour se connecter au compte
exports.login = (req, res, next) => {
    //Trouver l'email fourni dans la BDD
    User.findOne({email: req.body.email})
    .then(user => {

        //Vérifier si la valeur a été trouvée
        if (user === null) {
            res.status(401).json({message: 'identifiant/mot de passe incorrects'});
        }

        //Vérifier si le password es correct
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                res.status(401).json({message: 'identifiant/mot de passe incorrects'});
                }

                //Retour de l'objet néce´ssaire pour l'authentification
                else{
                    res.status(200).json({
                        userId: user._id,
                        token: jsonWT.sign(
                            {userId: user._id},
                            tokenKey,
                            {expiresIn: '24h'}
                        )
                    });
                }

            })
            .catch(error => {res.status(500).json({error})})
        }
    })
    .catch(error => { res.status(500).json({error})});

}