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

router.get('/:user_id', (req, res) => {
    Booking.find( { user: req.params.user_id }).populate('hotel', 'name mainImg location')
    .then(bookings => {
        res.status(200).send({
            success: true,
            bookings: bookings
        })
    })
    .catch(err => {
        res.status(400).send({
            success: false,
            errorMsg: 'Failed to retrieve bookings'
        })
    })
})

router.delete('/:booking_id', (req, res) => {
    Booking.deleteOne({ _id: req.params.booking_id }, (err, result) => {
        if (err) {
            res.status(400).send({
                success: false,
                errorMsg: 'Failed to delete booking'
            })
        }

        if (result) {
            res.status(200).send({
                success: true,
                result: result
            })
        }
    })
})

module.exports = router