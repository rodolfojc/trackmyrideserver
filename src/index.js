const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
// We need to create an instace in MongoDB and get the Url for connecting to the Cluster
const mongoUri = 'mongodb+srv://...'
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

// Routing
app.get('/', (req, res) => {
    res.send('Testing routing');
});

// Opening port for listening connections / requests
app.listen(3000, ()=>{
    console.log('Listening on port: 3000');
});