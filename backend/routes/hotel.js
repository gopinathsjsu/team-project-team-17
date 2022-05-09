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
        { name: 'Daily continental breakfast', price: breakfast },
        { name: 'Access to fitness room', price: fitness },
        { name: 'Access to swimming pool', price: pool },
        { name: 'Daily parking', price: parking },
        { name: 'All meals included', price: allMeals }
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
                res.status(200).send({
                    hotel: hotel
                })
            }
            else {
                res.status(400).send("Failed adding hotel")
            }
        })
        .catch(err => {
            res.status(400).send("Failed adding hotel")
        })
})

//Get all hotels
router.get('/', (req, res) => {
    Hotel.find({})
    .then(hotels => {
        if (hotels) {
            res.status(200).send({
                hotels: hotels
            })
        }
        else {
            res.status(400).send({
                errorMsg: "Failed retrieving hotels"
            })
        }
    })
    .catch(err => {
        res.staus(400).send({
            errorMsg: "Failed retrieving hotels"
        })
    })
})

//Get hotel based on id
router.get('/:id', (req, res) => {
    Hotel.findById(req.params.id)
    .then(hotel => {
        if (hotel) {
            res.status(200).send({
                hotel: hotel
            })
        }
        else {
            res.status(400).send({
                errorMsg: "Failed retrieving hotel"
            })
        }
    })
    .catch(err => {
        res.status(400).send({
            errorMsg: "Failed retrieving hotel"
        })
    })
})

//Get hotel rooms based on id
router.get('/rooms/:id', (req, res) => {
    Hotel.findById(req.params.id)
    .then(hotel => {
        if (hotel) {
            res.status(200).send({
                rooms: hotel.rooms
            })
        }
        else {
            res.status(400).send({
                errorMsg: "Failed retrieving hotel rooms"
            })
        }
    })
    .catch(err => {
        res.status(400).send({
            errorMsg: "Failed retrieving hotel rooms"
        })
    })
})

//Update hotel rooms
router.put('/updateRooms/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {rooms: req.body.rooms})

        if (updatedHotel) {
            res.status(200).send({
                success: true,
                hotel: updatedHotel
            })
        }
        else {
            res.status(400).send({
                success: false,
                errorMsg: 'Failed to update room info'
            })
        }
    } catch (e) {
        res.status(400).send({
            success: false,
            errorMsg: 'Failed to update room info'
        })
    }
})

module.exports = router