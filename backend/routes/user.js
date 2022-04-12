const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const User = mongoose.model("User");

//Create an account
router.post('/register', (req, res) => {
    res.send('Register')
})

//Log in
router.post('/login', (req, res) => {
    res.send('Login')
})

module.exports = router

//testing