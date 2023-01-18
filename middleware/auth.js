//Middleware de vérification du Token (authorize)
//Importer jsonwebtoken
const jsonWT = require('jsonwebtoken');

//Exporter le mw 
module.exports = (req, res, next) => {

    //code du mw
    try{
        //recuperer le token
        const token = req.header.authorization.split(' ')[1];

        //decoder le token
        const decodedToken = jsonWT.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        //ajouter la valeur à l'objet de requête
        req.auth = {
            userId: userId
        };
    }

    //En cas d'erreur
    catch(error){ res.status(401).json({error})};
};