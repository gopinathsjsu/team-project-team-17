//Import express module
const express = require('express')
//Create an express app
const app = express()

//Get image from url
app.use('/imgs', express.static('imgs'));

//Parse json and form input
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Fix cors errors
const cors = require('cors')
app.use(cors())

//Connect to MongoDB
const mongoose = require('mongoose');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500
};
mongoose.connect('mongodb+srv://admin:G2BP1n6f7kINHSb4@cluster0.weast.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    options, (err, res) => {
        if (err) {
            console.log(err)
            console.log("MongoDB connection failed")
        }
        else {
            console.log('MongoDB connected')
        }
    })

//import Models/schemas
require('./models/User')
require('./models/Hotel')
require('./models/Booking')

//Set up routes
app.use('/api', require('./routes/user'))
app.use('/hotel', require('./routes/hotel'))
app.use('/booking', require('./routes/booking'))

//Connect to server
const port = 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

