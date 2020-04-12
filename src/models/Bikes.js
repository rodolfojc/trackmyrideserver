const mongoose = require('mongoose');
//const Images = mongoose.model('Images');

const imagesSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: Date
});

const bikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
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
    img: [imagesSchema],
});

mongoose.model('Bike', bikeSchema);