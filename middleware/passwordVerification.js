const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Password must have at least 10 characters, at least one uppercase letter, one lowercase letter, and 1 digit, must not have spaces.' });
    } else {
        next();
    }
};