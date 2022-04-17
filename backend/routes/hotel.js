const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Hotel = mongoose.model("Hotel");
const { upload } = require('../uploadConfig')

//Add hotel
router.post('/add', upload.fields([ { name: 'mainImg', maxCount: 1 },
    { name: 'singleImg', maxCount: 1 },
    { name: 'doubleImg', maxCount: 1 },
    { name: 'suiteImg', maxCount: 1 }]), 
    (req, res) => {
    const { name, location, description, singlePrice, singleQuantity, doublePrice, doubleQuantity,
        suitePrice, suiteQuantity, breakfast, fitness, pool, parking, allMeals } = req.body

    const rooms = [
        {
            name: 'Single room',
            price: singlePrice,
            quantity: singleQuantity,
            roomImg: req.files.singleImg[0].path
        },
        {
            name: 'Double room',
            price: doublePrice,
            quantity: doubleQuantity,
            roomImg: req.files.doubleImg[0].path
        },
        {
            name: 'Suite',
            price: suitePrice,
            quantity: suiteQuantity,
            roomImg: req.files.suiteImg[0].path
        }
    ]

    const amenities = [
        {
            name: 'Daily continental breakfast',
            price: breakfast
        },
        {
            name: 'Access to fitness room',
            price: fitness
        },
        {
            name: 'Access to swimming pool/jacuzzi',
            price: pool
        },
        {
            name: 'Daily parking',
            price: parking
        },
        {
            name: 'All meals included',
            price: allMeals
        }
    ]


    const newHotel = new Hotel({
        mainImg: req.files.mainImg[0].path,
        name: name,
        location: location,
        description: description,
        rooms: rooms,
        amenities: amenities
    })

    newHotel.save()
        .then(hotel => {
            if (hotel) {
                res.status(200).send(hotel)
            }
            else {
                res.status(400).send("Failed adding hotel")
            }
        })
        .catch(err => {
            res.status(400).send("Failed adding hotel")
        })
})

module.exports = router