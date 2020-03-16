const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('Users');

const router = express.Router();

// Async Function for Signup a new User
router.post('/signup', async (req, res) => {
   const { email, password } = req.body;

   try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'TraCKmyR1D3');
    res.send({ token });

   } catch (err) {
    return res.status(422).send(err.message);
   }
});

module.exports = router;