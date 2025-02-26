const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator')


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
    const new_otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 minutes after otp is sent

    await User.findByIdAndUpdate(userId, {
        otp: new_otp,
        otp_expiry_time,
    });

    // TODO Send Mail

    res.status(200).json({
        status: "success",
        message: "OTP sent successfully",

    })

};

exports.verifyOTP = async (req, res, next) => {
    // verify OTP and update user record accordingly 

    const { email, otp } = req.body;

    const user = await User.findOne({
        email,
        otp_expiry_time: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400).json({
            status: "error",
            message: "Email is Invalid or OTP expired",
        });
    }

    if (user.verified) {
        return res.status(400).json({
            status: "error",
            message: "Email is already verified",
        });
    }

    if (!await user.correctOTP(otp, user.otp)) {
        return res.status(400).json({
            status: "error",
            message: "OTP is incorrect",
        });

    }

    // OTP is correct

    user.verified = true;
    user.otp = undefined;


    await user.save({ new: true, validateModifiedOnly: true });

    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        message: "OTP verified Successfully!",
        token,
        user_id: user._id,
    });
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

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.coorectPassword(password, user.password))) {
        return res.status(404).json({ status: "error", message: "Email or Password is incorrect" });
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token: token,

    })
}