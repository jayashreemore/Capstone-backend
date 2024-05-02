const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlenghth: 32,
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add valid email']
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'password  is required'],
        minlength: [6, 'password must have at lease (6) characters'],
    },

    role: {
        type: String,
        default: 'user',
    }
}, { timestamps: true })
