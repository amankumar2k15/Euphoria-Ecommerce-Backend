const { error, validateRes, success } = require("../helper/baseResponse");
const userModel = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require("../helper/sendMail");
require('dotenv').config();

const register = async (req, res) => {
    try {
        console.log("hey register");
        const newUser = await new userModel(req.body);
        newUser.save();
        return res.status(201).json(success(`${req.body.username}, registered successfully`, null, 201))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("hey login");
    try {
        const user = await userModel.findOne({ email: email })
        console.log(user);

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(422).json(error("Invalid Credentials", 422))
        } else {
            const token = jwt.sign({
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                email: user.email
            }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

            return res.status(201).json(success(`${user.username}, login successfully`, token, 200))
        }

    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const verifyEmail = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(422).json(validateRes(`user with this email does't exist`))
        const otp = (Math.random() * 100000).toString().split('.')[0];
        await sendMail(email, 'Otp verification', `Use this otp to reset your password => ${otp}`);
        user.otp = otp
        await user.save()
        return res.status(200).json(success('Send successfully', [], 200))
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    try {
        if (!otp) return res.status(422).json(validateRes("OTP is required"))
        const user = await userModel.findOne({ email });
        if (!user) return res.status(422).json(validateRes(`user with this email does't exist`))
        if (user.otp != otp) {
            return res.status(200).json(validateRes("Invalid OTP"))
        } else {
            return res.status(200).json(success("Valid OTP", [], 200))
        }
    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

const changePassword = async (req, res) => {
    try {
        const { email, password, cnfpassword } = req.body;

        if (password != cnfpassword) return res.status(422).json(validateRes(`Password and cnf password does't match `))
        if (password.length > 8 && password.length < 20) {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(password, salt);
            await userModel.findOneAndUpdate({ email: email }, { password: securedPassword }, { new: true })
            return res.status(201).json(success('Password has been changed', [], 201))
        } else {
            return res.status(422).json(validateRes(`password length must be between 6 to 20 character `))
        }

    }
    catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

// free routes for listing all users 

const users = async (req, res) => {
    try {
        return res.send(await userModel.find())
    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}





module.exports = {
    register,
    login,
    verifyEmail,
    verifyOtp,
    changePassword,
    changePassword,
    users

}






