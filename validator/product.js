const { body } = require("express-validator");

const createValidatorProduct = [
    body("title")
        .notEmpty().withMessage("Please enter title")
        .isString().withMessage("Please enter valid title"),
    body("description")
        .notEmpty().withMessage("Please enter description")
        .isString().withMessage("Please enter valid description"),
    body("size")
        .notEmpty().withMessage("Please enter size")
        .isString().withMessage("Please enter valid size"),
    body("spec")
        .notEmpty().withMessage("Please enter spec"),
    body("colors")
        .notEmpty().withMessage("Please enter colors"),
    body("price")
        .notEmpty().withMessage("Please enter price"),
    body("rating")
        .notEmpty().withMessage("Please enter rating")
]

module.exports = { createValidatorProduct }