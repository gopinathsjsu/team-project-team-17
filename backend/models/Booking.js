const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
    },
    startDate: Date,
    endDate: Date,
    room: String,
    amenities: [String],
    total: Number,
    numGuests: Number,
    rewards: {
        used: Boolean,
        amount: Number
    }

});

module.exports = mongoose.model("Booking", BookingSchema);