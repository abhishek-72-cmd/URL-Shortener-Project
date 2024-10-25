const express = require('express');
const app = express();
const port = 8001;
const mongoose = require('mongoose');
const ShortUrl = require('./Models/url');
const urlRoutes = require('./Routes/url')

app.use(express.urlencoded({ extended: false }));

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

// Use the environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/urlShortener';


mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  
app.set('view engine', 'ejs');

// use the routes fromurlRoutes.js
app.use('/', urlRoutes);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
