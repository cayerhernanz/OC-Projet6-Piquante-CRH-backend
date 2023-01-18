//Model de l'utilisateur
//importation de mongoose et du validateur
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schéma de l'objet utilisateur
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

//appel au validateur
userSchema.plugin(uniqueValidator);

//Exportation
module.exports = mongoose.model('User', userSchema);