const express = require('express');
const router = new express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const {register} = require("../controllers/register");
//Create an account
router.post('/register', register);

//Log in
router.post('/login', (req, res) => {
    res.send('Login')
})

module.exports = router

