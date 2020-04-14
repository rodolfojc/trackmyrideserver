const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'
    },
    filename: String,
    originalName: String,
    desc: String,
    created: Date
});

mongoose.model('Images', imagesSchema);