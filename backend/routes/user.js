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

router.put('/updateInfo/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (updatedUser) {
            res.status(200).send({
                success: true,
                user: updatedUser
            })
        }
        else {
            res.status(400).send({
                success: false,
                errorMsg: 'Failed updating user info'
            })
        }
    }
    catch (e) {
        res.status(400).send({
            success: false,
            errorMsg: 'Failed updating user info'
        })
    }
})

module.exports = router

