const express = require('express');
const router = new express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const {register} = require("../controllers/register");
const { login } = require('../controllers/login')
//Create an account
router.post('/register', register);

//Log in
router.post('/login', login)

module.exports = router

