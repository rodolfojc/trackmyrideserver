const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    serial: {
        type: Number,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    type: {
        type: String,        
    },
    status: {
        type: String,        
    },
    lock: {
        type: Boolean,
    },
    img: {
        //data: Buffer, 
        //contentType: String
        type: String,
    }

});

mongoose.model('Bike', bikeSchema);