const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "enter correct password",
            });
        }
        const token = await generateToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, title } = req.body;
        const existed = await User.findOne({ email });
        if (existed) {
            await res.json({ success: false, message: "user already exists" });
        }

        if (!validator.isEmail(email)) {
            await res.json({ success: false, message: "enter  a valid email" });
        }
        if (password.length < 8) {
            await res.json({
                success: false,
                message: "length of password should be atleast 8",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newuser = await new User({
            name: name,
            email: email,
            password: hash,
            title: title,
        });

        const user = await newuser.save();
        const token = await generateToken(user._id);
        res.json({
            success: true,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

module.exports = {
    loginUser,
    registerUser,
};
