const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: Date
});

mongoose.model('Images', imagesSchema);