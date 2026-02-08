const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');
const { isLoggedIn } = require('../middleware/auth');

// GET /tips - Anonymous: show form, Logged-in: show tips list
router.get('/', async (req, res) => {
    if (req.session && req.session.user) {
        try {
            const allowedSortFields = ['dateAdded', 'status', 'url', 'message'];
            const sort = allowedSortFields.includes(req.query.sort) ? req.query.sort : 'dateAdded';
            const order = req.query.order === 'asc' ? 1 : -1;

            const filter = {};
            const statusFilter = req.query.status;
            if (['new', 'processed', 'rejected'].includes(statusFilter)) {
                filter.status = statusFilter;
            }

            const tips = await Tip.find(filter).sort({ [sort]: order });
            res.render('tips/index', { title: 'Tips', tips, sort, order, statusFilter: statusFilter || '', layout: './Layouts/layout' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.render('tips/form', { title: 'Submit a Tip', errors: [], success: false, formData: {}, layout: './Layouts/layout' });
    }
});

// POST /tips - Submit a new tip
router.post('/', async (req, res) => {
    const { url, message, email } = req.body;
    const formData = { url, message, email };

    try {
        const tip = new Tip({ url, message, email });
        await tip.save();
        res.render('tips/form', { title: 'Submit a Tip', errors: [], success: true, formData: {}, layout: './Layouts/layout' });
    } catch (err) {
        const errors = [];
        if (err.errors) {
            for (const field in err.errors) {
                errors.push(err.errors[field].message);
            }
        } else {
            errors.push('An unexpected error occurred.');
        }
        res.render('tips/form', { title: 'Submit a Tip', errors, success: false, formData, layout: './Layouts/layout' });
    }
});

// GET /tips/:id - Tip detail (logged-in only)
router.get('/:id', isLoggedIn, async (req, res) => {
    try {
        const tip = await Tip.findById(req.params.id);
        if (!tip) {
            return res.status(404).send('Tip not found');
        }
        res.render('tips/show', { title: 'Tip Details', tip, layout: './Layouts/layout' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /tips/:id/delete - Delete a tip (logged-in only)
router.post('/:id/delete', isLoggedIn, async (req, res) => {
    try {
        await Tip.findByIdAndDelete(req.params.id);
        res.redirect('/tips');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
