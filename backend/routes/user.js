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

//Get user info
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')

        res.status(200).send({
            success: true,
            user: user
        })
    } catch(e) {
        res.status(400).send({
            success: false,
            errorMsg: 'Failed getting user info'
        })
    }
})

module.exports = router

