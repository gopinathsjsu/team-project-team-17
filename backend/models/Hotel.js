const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  rooms: [ {
    name: { type: String, enum: ['Single room', 'Double room', 'Suite'] },
    description: String,
    price: Number,
    quantity: Number
  } ],
  amenities: [ {
    name: { type: String, enum: [
        'Daily continental breakfast',
        'Access to fitness room',
        'Access to swimming pool/jacuzzi',
        'Daily parking',
        'All meals included'
    ]},
    price: Number
  } ]
});

module.exports = mongoose.model("Hotel", HotelSchema);