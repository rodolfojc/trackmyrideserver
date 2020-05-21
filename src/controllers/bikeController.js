const UPLOAD_PATH = require('../routes/bikeRoutes').UPLOAD_PATH;
const mongoose = require("mongoose");
const Image = mongoose.model("Images");
const Bike = mongoose.model("Bike");
const path = require("path");
const fs = require("fs");

// Method to register a new bike
exports.registerBike = async (req, res) => {
  const { serial, brand, color, type, status, lock , userId } = req.body;  

  try {
      const bike = new Bike({
      userId: userId,
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
    res.status(200).send({ message: "Bike has been registered", bikeId: bike._id });
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

// Upload a picture
exports.uploadImage = async (req, res) => {
  
  let img = new Image();
  img.bikeId = req.body.bikeid
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

// Method to provide list of bikes for any user
exports.getBikes = function(req, res) {
  let userId = req.params.id;
  Bike.find({ userId })
  .lean()
  .exec((err, bikes) => {
    if (err) {
      return res.sendStatus(400);
    }
    res.json(bikes);
  });
}

// Get images method 
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

// Method to get bikes image
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

exports.updateBike = async function(req, res) {

  const { serial, brand, color, type, status, lock } = req.body;
  let bikeId = req.params.id;
  
  Bike.findById(bikeId, (err, bike) => {
    if (err) {
        return res.sendStatus(400);
    }
    bike.serial = serial;
    bike.brand = brand;
    bike.color = color;
    bike.type = type;
    bike.status = status;
    bike.lock = lock;
    bike.save();
    
    res.json({message: "Bike updated!"});    
  });
} 
