const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Hotel = mongoose.model("Hotel");
const { upload } = require('../uploadConfig')

//Add hotel
router.post('/add', (req, res) => {
    const { name, location, description, singlePrice, singleQuantity, doublePrice, doubleQuantity,
        suitePrice, suiteQuantity, breakfast, fitness, pool, parking, allMeals } = req.body

    const rooms = [
        {
            name: 'Single room',
            price: singlePrice,
            quantity: singleQuantity
        },
        {
            name: 'Double room',
            price: doublePrice,
            quantity: doubleQuantity
        },
        {
            name: 'Suite',
            price: suitePrice,
            quantity: suiteQuantity
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