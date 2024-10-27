const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        title: {
            type: String,
            enum: ["Judge", "Police Officer", "Investigating Officer"],
            required: [true, "Title is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
