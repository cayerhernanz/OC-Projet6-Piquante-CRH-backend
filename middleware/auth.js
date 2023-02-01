//Middleware de vérification du Token (authorize)
//Importer jsonwebtoken
const jsonWT = require('jsonwebtoken');

//Importer dotenv
require('dotenv').config();

//Créer la variable de token secret
const tokenKey = process.env.RANDOM_TOKEN_SECRET;

//Exporter le mw 
module.exports = (req, res, next) => {

    //code du mw
    try{
        //recuperer le token
        const token = req.header.authorization.split(' ')[1];

        //decoder le token
        const decodedToken = jsonWT.verify(token, tokenKey);
        const userId = decodedToken.userId;

        //ajouter la valeur à l'objet de requête
        req.auth = {
            userId: userId
        };
        next();
    }

    //En cas d'erreur
    catch(error){ res.status(401).json({error})};
};