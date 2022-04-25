const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Booking = mongoose.model("Booking");

router.post('/', (req, res) => {
    const { user, hotel, startDate, endDate, room,
            amenities, total, numGuests, rewards } = req.body

    const booking = new Booking({
        user: user,
        hotel: hotel,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        room: room,
        amenities: amenities,
        total: total,
        numGuests: numGuests,
        rewards: rewards
    })

    booking.save()
    .then(booking => {
        if (booking) {
            res.status(200).send({
                success: true,
                booking: booking
            })
        }
        else {
            res.status(400).send({
                success: false,
                errorMsg: "Failed to book room"
            })
        }
    })
    .catch(err => {
        res.status(400).send({
            success: false,
            errorMsg: "Failed to book room"
        })
    })
})

module.exports = router