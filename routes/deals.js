const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');
const { isLoggedIn } = require('../middleware/auth');

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

// GET New Deal Form
router.get('/new', isLoggedIn, (req, res) => {
    const formData = {
        title: '',
        description: req.query.description || '',
        imageUrl: req.query.url || '',
        category: ''
    };
    res.render('deals/new', { title: 'Create Deal', errors: [], formData, layout: './Layouts/layout' });
});

// POST Create Deal
router.post('/', isLoggedIn, async (req, res) => {
    const { title, description, imageUrl, category } = req.body;
    const formData = { title, description, imageUrl, category };

    try {
        const deal = new Deal({ title, description, imageUrl, category });
        await deal.save();
        res.redirect('/deals/' + deal._id);
    } catch (err) {
        const errors = [];
        if (err.errors) {
            for (const field in err.errors) {
                errors.push(err.errors[field].message);
            }
        } else {
            errors.push('An unexpected error occurred.');
        }
        res.render('deals/new', { title: 'Create Deal', errors, formData, layout: './Layouts/layout' });
    }
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