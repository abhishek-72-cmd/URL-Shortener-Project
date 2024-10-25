// In routes.js
const express = require('express');
const router = express.Router();
const ShortUrl = require('../Models/url');

const baseURL = process.env.BASE_URL || 'http://localhost:8001';

router.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    // Pass baseURL to the template
    res.render('index', { shortUrls: shortUrls, baseURL: baseURL });
});

router.post('/shortUrl', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl }); // Corrected fullUrl name
    res.redirect('/');
});

router.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.status(404).send('URL not found'); // Fixed null check

    shortUrl.clicks++;
    await shortUrl.save();

    res.redirect(shortUrl.full);
});

router.post('/deleteUrl/:id', async (req, res) => {
    try {
        await ShortUrl.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting URL:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
