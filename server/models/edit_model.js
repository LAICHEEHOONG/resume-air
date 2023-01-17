const mongoose = require('mongoose');

const editSchema = mongoose.Schema({
    image: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    employmentHistory: { type: String, trim: true },
    education: { type: String, trim: true },
    skill: { type: Object },
    userEmail: {
        type: String,
        trim: true,
        unique: true,
    }
})

const Edit = mongoose.model('Edit', editSchema);
module.exports = { Edit };