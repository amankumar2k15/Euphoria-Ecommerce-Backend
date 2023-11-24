const express = require('express')
const route = express()
const { register, login, users, verifyEmail, verifyOtp, changePassword } = require('../controller/user');
const { createUser, signUser, verify, changePass } = require('../validator/user');
const { validate } = require('../middleware/validate')


route.post('/signup', validate(createUser), register);
route.post('/signin', validate(signUser), login);
route.post('/verify', validate(verify), verifyEmail);
route.post('/verifyotp', validate(verify), verifyOtp);
route.patch('/changepassword', validate(changePass), changePassword);


route.get('/getall', users);


module.exports = route
