const express = require('express');

const router = express.Router();

router.post('/signin', (req, res) => {
    res.send('POST request has been made');
});

module.exports = router;