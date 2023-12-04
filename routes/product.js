const express = require('express')
const route = express()
const { createProduct, getProduct, searchProductByTitle , editProduct , deleteProduct } = require('../controller/product');
const { validate } = require("../middleware/validate")
const upload = require('../middleware/upload')

route.post('/create-product', upload.array("avatar", 5), createProduct);
// route.post('/create-product', upload.single("avatar"), createProduct);
route.get('/get-product', getProduct);
route.get('/search-product', searchProductByTitle);

route.put('/products/:id', upload.array("avatar", 5) , editProduct);
route.delete('/products/:id', deleteProduct);


module.exports = route
