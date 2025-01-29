const jwt = require("jsonwebtoken");


//
const User = require("../models/user");
const filterobj = require("../utils/filterOBJ");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

//Register new user

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const filteredBody = filterobj(req.body, "firstName", "lastName", "password", "email");

    //check if a verified user withgiven email exists

    const existing_user = await User.findOne({ email: email });

    if (existing_user && existing_user.verified) {
        res.status(400).json({ status: "error", message: "Email is already in use, Please login." });
    }
    else if (existing_user) {
        await User.findOneAndUpdate({ email: email }, filteredBody, { new: true, validateModifiedOnly: true });

        // generate OTP send email to user
        req.userId = existing_user._id;
        next();
    }
    else {
        // if user record is not available in DB

        const new_user = await User.create(filteredBody);

        // generate OTP send email to user

        req.userId = new_user._id;

        next();
    }

}


exports.sendOTP = async (req, res, next) => {
    const { userId } = req;
}


// login
exports.login = async (req, res, next) => {


    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Please provide email and password" });
    }

    const userDoc = await User.findOne({ email: email }).select("+password");

    if (!userDoc || !(await userDoc.coorectPassword(password, userDoc.password))) {
        res.status(404).json({ status: "error", message: "Email or Password is incorrect" });
    }

    const token = signToken(userDoc._id);

    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token: token,

    })
}