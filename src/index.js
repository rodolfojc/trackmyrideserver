// Models - as reference to be execute just once
require('./models/Users');
require('./models/Bikes');

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

// Parsing to JSON in Express
app.use(bodyParser.json());

app.use(authRoutes);
app.use(bikeRoutes);

// MongoDB connection
// We need to create an instace in MongoDB and get the Url for connecting to the Cluster
const mongoUri = 'mongodb+srv://rodolfojc:rodolfo@cluster0-eyxy6.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Success connection notification - Mongoose
mongoose.connection.on('connected', ()=> {
    console.log('Connected to Mongo Instance!');
});

// Error connection notification - Mongoose
mongoose.connection.on('error', err =>{
    console.log('Something went wrong with Mongo instance connection: ', err);
});

// Routing // Added middleware for token verification
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is: ${req.user.email}`);
});

// Opening port for listening connections / requests
app.listen(3000, ()=>{
    console.log('Listening on port: 3000');
});