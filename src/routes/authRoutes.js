const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

const router = express.Router();

// Async Function for Signup a new User
router.post('/signup', async (req, res) => {
   const { email, password } = req.body;

   try {
    const user = new User({ email, password });
    await user.save();

   } catch (err) {
    return res.status(422).send(err.message);
   }
});

module.exports = router;