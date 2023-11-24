const express = require('express')
const route = express()
const { createProduct, getProduct, searchProductByTitle } = require('../controller/product');
const { createValidatorProduct } = require('../validator/product')
const { validate } = require("../middleware/validate")
const upload = require('../middleware/upload')

route.post('/create-product', validate(createValidatorProduct), upload.single("avatar"), createProduct);
route.get('/get-product', getProduct);
route.get('/search-product', searchProductByTitle);

module.exports = route
