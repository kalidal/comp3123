const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8088;

// Security & Rate Limiting 
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: false, message: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Body Parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Local Logging 
app.use((req, res, next) => {
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
    const logEntry = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl}\n`;
    fs.appendFile(path.join(logDir, 'app.log'), logEntry, (err) => {
        if (err) console.error('Logging error:', err);
    });
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB: comp3123_assignment1'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Health Check 
app.get('/health', (req, res) => {
    res.status(200).json({ status: true, message: 'API is running successfully', timestamp: new Date() });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});