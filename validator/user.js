const { body, oneOf } = require("express-validator");
const userModel = require("../models/user");


const createUser = [
    body("email")
        .notEmpty()
        .withMessage("Please enter email")
        .isEmail()
        .withMessage("Please enter valid email")
        .custom((value) => {
            return userModel.find({
                email: value,
            }).then((user) => {
                if (user.length != 0) {
                    return Promise.reject("User with this email already exists!");
                }
                return true;
            });
        }),
    body("username")
        .notEmpty()
        .withMessage("Please enter username ")
        .isString()
        .withMessage("Please enter valid username")
        .custom((value) => {
            return userModel.find({
                username: value,
            }).then((user) => {
                if (user.length != 0) {
                    return Promise.reject("User with this username already exists!");
                } return true;

            });
        }),
    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .isString()
        .withMessage("Please enter a valid password")
        .isLength({
            min: 6
        })
        .withMessage("Password must contain at least 6 characters")
        .isLength({
            max: 20
        })
        .withMessage("Password can contain max 20 characters")
];

const signUser = [

    body("email")
        .notEmpty()
        .withMessage("Please enter email ")
        .isEmail()
        .withMessage("Please enter valid email")
        .custom((value) => {
            return userModel.find({
                email: value,
            }).then((user) => {
                if (user.length === 0) {
                    return Promise.reject("User with this email does't exists!");
                }
                return true;
            });
        }),

    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .isString()
        .withMessage("Please enter a valid password"),
];

const verify = [
    body("email")
        .notEmpty()
        .withMessage("Please enter email ")
        .isEmail()
        .withMessage("Please enter valid email")
];

const changePass = [
    ...verify,
    body("password")
        .notEmpty()
        .withMessage("Please enter password")
        .isString()
        .withMessage("Please enter a valid password"),
    body("cnfpassword")
        .notEmpty()
        .withMessage("Please enter confirm password"),
];

module.exports = {
    createUser,
    signUser,
    verify,
    changePass

};
