const contactusModel = require("../models/contactusModel");
const ErrorResponse = require("../utils/errorResponse");

exports.contactus = async (req, res, next) => {
    const { name, email, phone, message } = req.body;

    try {
        // Check if email already exists
        let existingContact = await contactusModel.findOne({ email });
        if (existingContact) {
            return res
                .status(400)
                .json({ success: false, error: "Email already subscribed" });
        }

        // Create a new contact form submission
        const newContact = await contactusModel.create({
            name,
            email,
            phone,
            message,
        });

        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        next(error);
    }
};