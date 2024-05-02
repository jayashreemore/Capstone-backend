const mongoose = require("mongoose");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const subscriptionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: [true, "email is required"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add valid email",
            ],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);