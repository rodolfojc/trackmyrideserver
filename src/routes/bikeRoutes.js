const express = require("express");
const mongoose = require("mongoose");
const Bike = mongoose.model("Bike");
const imagesSchema = require('../models/Images');
const router = express.Router();

router.post("/registerbike", async (req, res) => {
  const { serial, brand, color, type, status, lock } = req.body;

    //console.log(req.file.name);
    console.log(req.body.serial);

    let img = new imagesSchema();
    img.filename = req.file.filename;
    img.originalName = req.file.originalname;
    img.desc = req.body.desc;
    // img.save(err => {
    //     if (err) {
    //         return res.sendStatus(400);
    //     }
    //     res.status(201).send({ newImage })
    // });

  try {
    const bike = new Bike({ userId: req.user_id, serial, brand, color, type, status, lock, img });
    console.log(bike);
    await bike.save();
    res.status(200).send({ message: "Bike has been registered" });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
