const mongoose = require("mongoose");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const contactusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("contactus", contactusSchema);