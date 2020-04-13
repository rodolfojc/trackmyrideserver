const UPLOAD_PATH = require('../routes/bikeRoutes').UPLOAD_PATH;
const mongoose = require("mongoose");
const Image = mongoose.model("Images");
const Bike = mongoose.model("Bike");
const path = require("path");
const fs = require("fs");
const del = require("del");

exports.registerBike = async (req, res) => {
  const { serial, brand, color, type, status, lock } = req.body;

  try {
    const bike = new Bike({
      userId: req.user_id,
      serial,
      brand,
      color,
      type,
      status,
      lock,
      img: [],
    });
    console.log(bike);
    await bike.save();
    res.status(200).send({ message: "Bike has been registered" });
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

exports.uploadImage = async (req, res) => {

  let img = new Image();  
  img.filename = req.file.filename;
  img.originalName = req.file.originalname;
  img.desc = req.body.desc;

  try {
    await img.save();
    res.status(201).send({ img });
  } catch (err) {
    return res.sendStatus(400);
  }
};

exports.getImages = function(req, res) {
    Image.find({}, '-__v')
    .lean()
    .exec((err, images) => {
        if (err) {
            return res.sendStatus(400);
        }

        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    });
};

exports.getImage = function(req, res) {
    
    let imgId = req.params.id;

    Image.findById(imgId, (err, image) => {
        if (err) {
            return res.sendStatus(400);
        }        
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    });
};