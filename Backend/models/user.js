const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        tyhpe: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        tyhpe: String,
        required: [true, "Last Name is required"]
    },
    avatar: {
        type: String,

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (email) {
                return String(email).toLocaleLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            },
            message: (props) => `Email (${props.value}) is invalid!`,
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        validate: {
            validator: function (password) {
                return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/);
            },
            message: (props) => `Password (${props.value}) is too weak!`,
        }
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,

    },
    updatedAt: {
        type: Date,

    },
    verified: {
        type: Boolean,
        default: false
    }

});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = new mongoose.model("User", userSchema);
module.exports = User;