const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("Email already registered", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new ErrorResponse("Please add an email", 403));
        }

        if (!password) {
            return next(new ErrorResponse("Please add an password", 403));
        }

        //check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            id: user._id,
            role: user.role,
        });
};

//log out
exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "logged out",
    });
};

//user profile
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
        success: true,
        user,
    });
};

//user list
exports.userList = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
};

//show single user
exports.showSingleUser = async (req, res, next) => {
    try {
        const users = await User.findById(req.params.id);
        console.log(users);
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};

//delete user
exports.deleteUser = async (req, res, next) => {
    const currentUser = await User.findById(req.params.id);

    try {
        const users = await User.findByIdAndRemove(req.params.id);
        console.log(req.params.id);
        res.status(200).json({
            success: true,
            message: "User Deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

//update user
exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const currentUser = await User.findById(req.params.id);

        //build the object data
        const data = {
            name: name || currentUser.name,
            email: email || currentUser.email,
            //  password: password || currentUser.password,
            role: role || currentUser.role,
        };

        const userUpdate = await User.findByIdAndUpdate(req.params.id, data, {
            new: true,
        });

        res.status(200).json({
            success: true,
            userUpdate,
        });
    } catch (error) {
        next(error);
    }
};