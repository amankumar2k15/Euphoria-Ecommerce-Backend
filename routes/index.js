const express = require('express');
const route = express()

const userRoutes = require('./user');
const productRoutes = require("./product")

route.use('/user', userRoutes);
route.use("/product", productRoutes)

module.exports = route;
