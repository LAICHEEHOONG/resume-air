// const { User } = require('../models/user_model');
const {User} = require('../models/user_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkToken = async (req, res, next) => {
    try {
        if (req.headers['resume-air-token']) {
            const accessToken = req.headers['resume-air-token'];
            const { _id, email, exp } = jwt.verify(accessToken, process.env.DB_SECRET);
            const user = await User.findOne({ email });
            res.locals.userData = user;
            next()
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Bad token', errors: error })
    }
}

exports.checkLoggedIn = (req, res, next) => {
    const user = res.locals.userData;
    if(!user) return res.status(401).json({error: 'No user. Please log in'});//write clear a bit to client
    req.user = user;
    next();
}