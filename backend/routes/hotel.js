const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Hotel = mongoose.model("Hotel");

//Add hotel
router.post('/add', (req, res) => {
    res.send('Hotel')
})

module.exports = router