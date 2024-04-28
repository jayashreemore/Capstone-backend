const Subscription = require("../models/SubscriptionModel");
const ErrorResponse = require("../utils/errorResponse");

exports.subscription = async (req, res, next) => {
    const { email } = req.body;
    const subscriptionExist = await Subscription.findOne({ email });
    if (subscriptionExist) {
        return next(new ErrorResponse("Email already subscribed", 400));
    }
    try {
        const subscription = await Subscription.create(req.body);
        res.status(201).json({
            success: true,
            subscription,
        });
    } catch (error) {
        next(error);
    }
};
