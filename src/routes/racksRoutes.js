const express = require("express");
const mongoose = require("mongoose");
const Racks = mongoose.model("Racks");

const router = express.Router();

// Async function for adding a new rack
router.post("/map", async (req, res) => {
  const { type } = req.body;

  console.log(req.body);

  try {
    const rack = new Racks(req.body);
    await rack.save();
    res.status(200).send({ message: "Rack Added Sucesfully" });
  }catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;