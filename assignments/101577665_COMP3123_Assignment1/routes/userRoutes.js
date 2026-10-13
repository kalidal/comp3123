const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/v1/user/signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully.', user_id: user._id });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
});

// POST /api/v1/user/login
router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const query = username ? { username } : { email };
        const user = await User.findOne(query);
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
});

module.exports = router;