const express = require('express');
const app = express();
const port = 8001;
const mongoose = require('mongoose');
const ShortUrl = require('./Models/url');

app.use(express.urlencoded({ extended: false }));

// Use the environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/urlShortener';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
  
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrl', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl }); // Corrected fullUrl name
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl == null) return res.status(404).send('URL not found'); // Fixed null check

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});

app.post('/deleteUrl/:id', async (req,res)=>{

try{
    await ShortUrl.findByIdAndDelete(req.params.id);
    res.redirect('/')
} catch (error) {
    console.error('Error deleting URL:', error);
    res.status(500).send('Server Error');
}
});


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
