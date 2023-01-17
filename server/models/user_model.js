const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalide email');
            }
        }
    },
    family_name: {
        type: String,
        trim: true
    },
    given_name: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    picture: {
        type: String,
        trime: true
    },
    password: {
        type: String,
        // required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


userSchema.pre('save', async function (next) {
    let user = this;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
});

userSchema.statics.emailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
}

userSchema.methods.generateToken = function () {
    let user = this;
    const userObj = { _id: String(user._id), email: user.email };
    const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: '1h' });
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match; //match === boolean
}



const User = mongoose.model('User', userSchema);
module.exports = { User };


