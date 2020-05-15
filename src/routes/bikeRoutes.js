module.exports.UPLOAD_PATH = 'uploads';

const express = require("express");
const bikeCtrl = require('../controllers/bikeController');
const multer = require('multer');
upload = multer(({ dest: module.exports.UPLOAD_PATH }));

const router = express.Router();
router.post("/registerbike", bikeCtrl.registerBike);
router.get("/getbikes/:id", bikeCtrl.getBikes);
router.post("/updatebike/:id", bikeCtrl.updateBike);
router.post("/upload", upload.single('image'), bikeCtrl.uploadImage);
router.get("/images", bikeCtrl.getImages);
router.get('/images/:id', bikeCtrl.getImage);

module.exports = router;
