const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');

// GET All Deals
router.get('/', async (req, res) => {
    try {
        const deals = await Deal.find({});
        res.render('deals/index', { title: 'Deals', deals, layout: './Layouts/layout' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST vote
router.post('/vote/:id', async (req, res) => {
    const deal = await Deal.findById(req.params.id);
    deal.score = deal.score + req.body.vote;
    await deal.save();
    res.json({ success: true });
});

// GET Deal Details
router.get('/:id', async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
            return res.status(404).send('Deal not found');
        }
        res.render('deals/show', { title: deal.title, deal, layout: './Layouts/layout' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;