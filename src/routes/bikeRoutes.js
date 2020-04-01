const express = require("express");
const mongoose = require("mongoose");
const Bike = mongoose.model("Bike");

const router = express.Router();

router.post("/registerbike", async (req, res) => {
  const { serial, brand, color, type, status, lock, img } = req.body;

  try {
    const bike = new Bike({ serial, brand, color, type, status, lock, img });
    console.log(bike);
    await bike.save();
    res.status(200).send({ message: "Bike has been registered" });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
