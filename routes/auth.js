const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET Register Page
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register', layout: './Layouts/layout' });
});

// POST Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.render('auth/register', { title: 'Register', layout: './Layouts/layout', error: 'User already exists' });
        }
        user = new User({ name, email, password });
        await user.save();
        req.session.user = { id: user._id, name: user.name, email: user.email };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('auth/register', { title: 'Register', layout: './Layouts/layout', error: 'Server Error' });
    }
});

// GET Login Page
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login', layout: './Layouts/layout' });
});

// POST Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('auth/login', { title: 'Login', layout: './Layouts/layout', error: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('auth/login', { title: 'Login', layout: './Layouts/layout', error: 'Invalid credentials' });
        }
        req.session.user = { id: user._id, name: user.name, email: user.email };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('auth/login', { title: 'Login', layout: './Layouts/layout', error: 'Server Error' });
    }
});

// GET Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error(err);
        res.redirect('/auth/login');
    });
});

module.exports = router;
