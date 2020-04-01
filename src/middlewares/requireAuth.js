const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('Users');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === Bearer sfgsjd9948329854 (Token)

    // User has to provide a JSON token in headers to connect to MongoDB
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in. '});
    }

    // Extranting the JSON token value === 'Bearer sfgsjd9948329854' without the Bearer
    const token = authorization.replace('Bearer ', '');

    // Verification of the token provided by the user
    jwt.verify(token, 'TraCKmyR1D3', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in. '});
        }

        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();

    });
};