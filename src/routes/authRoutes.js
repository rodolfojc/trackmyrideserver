const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

// Async Function for Signup a new User
router.post('/signup', async (req, res) => {
   const { email, password } = req.body;

   const user = new User({ email, password });
   await user.save();

});

module.exports = router;