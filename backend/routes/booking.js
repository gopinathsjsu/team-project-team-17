const express = require('express')
const router = new express.Router()
const mongoose = require("mongoose");
const Booking = mongoose.model("Booking");
const Hotel = mongoose.model('Hotel')
const User = mongoose.model('User')

router.post('/', (req, res) => {
    const { user, hotel, startDate, endDate, room,
        amenities, total, numGuests, rewards } = req.body

    const booking = new Booking({
        user: user,
        hotel: hotel,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        room: room,
        amenities: amenities,
        total: total,
        numGuests: numGuests,
        rewards: rewards
    })

    booking.save()
        .then(booking => {
            if (booking) {
                Hotel.updateOne({ '_id': hotel, 'rooms.name': room },
                    { $inc: { 'rooms.$.quantity': -1 } }, (err, hotel) => {
                        if (err) {
                            res.status(400).send({
                                success: false,
                                errorMsg: "Failed to update room quantity"
                            })
                        }

                        if (hotel) {
                            let rewardsUsed = 0

                            if (booking.rewards.used) rewardsUsed = booking.rewards.amount

                            User.updateOne({ _id: user }, { $inc: { rewards: 500 - rewardsUsed } }, { new: true })
                                .then(updatedUser => {
                                    if (updatedUser) {
                                        res.status(200).send({
                                            success: true,
                                            booking: booking,
                                            hotel: hotel,
                                            user: updatedUser
                                        })
                                    }
                                    else {
                                        res.status(400).send({
                                            success: false,
                                            errorMsg: "Failed to increment rewards"
                                        })
                                    }
                                })
                                .catch(err => {
                                    res.status(400).send({
                                        success: false,
                                        errorMsg: "Failed to increment rewards"
                                    })
                                })
                        }
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
    Booking.find({ user: req.params.user_id }).populate('hotel', 'name mainImg location')
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
    Booking.findOneAndDelete({ _id: req.params.booking_id }, (err, booking) => {
        if (err) {
            res.status(400).send({
                success: false,
                errorMsg: 'Failed to delete booking'
            })
        }

        if (booking) {
            Hotel.updateOne({ '_id': booking.hotel, 'rooms.name': booking.room },
                { $inc: { 'rooms.$.quantity': 1 } }, (err, hotel) => {
                    if (err) {
                        res.status(400).send({
                            success: false,
                            errorMsg: "Failed to update room quantity"
                        })
                    }

                    if (hotel) {
                        if (booking.rewards.used) {
                            User.findByIdAndUpdate(booking.user, {$inc: { rewards: booking.rewards.amount}}, { new: true })
                            .then(updatedUser => {
                                if (updatedUser) {
                                    res.status(200).send({
                                        success: true,
                                        booking: booking,
                                        hotel: hotel,
                                        user: updatedUser
                                    })
                                }
                                else {
                                    res.status(400).send({
                                        success: false,
                                        errorMsg: "Failed to refund rewards"
                                    })
                                }
                            })
                            .catch(err => {
                                res.status(400).send({
                                    success: false,
                                    errorMsg: "Failed to refund rewards"
                                })
                            })
                        }
                        else {
                            res.status(200).send({
                                success: true,
                                booking: booking,
                                hotel: hotel
                            })
                        }
                    }
                })
        }
    })
})

module.exports = router