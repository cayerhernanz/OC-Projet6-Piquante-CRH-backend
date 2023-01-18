//Model de l'utilisateur
const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true}
  
});

module.exports = mongoose.model('User', userModel);