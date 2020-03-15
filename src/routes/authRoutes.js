const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signin', (req, res) => {
    res.send('POST request has been made');
});

module.exports = router;