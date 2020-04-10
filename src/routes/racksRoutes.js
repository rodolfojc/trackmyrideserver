const express = require('express');
const mongoose = require('mongoose');
const Racks = mongoose.model('Racks');

const router = express.Router();

// Async function for adding a new rack
router.post('/addrack', async (req, res) => {
  
  // console.log(req.body);
  try {
    const rack = new Racks(req.body);
    await rack.save();
    res.status(200).send({ message: "Rack has been added for review" });
  }catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get('/getracks', async (req, res) =>{
  try {
    const racks = await Racks.find();
    res.status(200).send(racks);
  }catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;