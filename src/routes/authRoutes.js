const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('Users');

const router = express.Router();

// Async Function for Signup a new user
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

// Async Function for Signin an existing user
router.post('/signin', async (req, res) => {
   
   // Destructuring body content from request 
   const { email, password } = req.body;

   // Checking if email and paswword is provided
   if (!email || !password) {
      return res.status(422).send({ error : 'You must provide an email and password' });
   }

   // Checking if the user is saved in database
   const user = await User.findOne({ email });
   
   // Not email found
   if (!user) {
      return res.status(422).send({ error: 'Invalid password or email' });
   }

   // Email found
   try {
      // Comparing passwords; user input + salt + hash === hashed password in database
      await user.comparePassword(password);
      // Generating JSON Web Token
      const token = jwt.sign({ userId: user._id }, 'TraCKmyR1D3');
      // Sending token to user
      res.send({ token });
   } catch (err) {
      // Password did not match
      return res.status(422).send({ error: 'Invalid password or email' });
   }
});

module.exports = router;