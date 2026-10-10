
const express = require('express');
const path = require('path');

const app = express();
const userRouter = require('./routes/users');

// Middleware to read JSON request bodies.
app.use(express.json());

// Middleware to read URL-encoded form bodies.
app.use(express.urlencoded({ extended: true }));

// Mount the user router under /api/v1/user.
app.use('/api/v1/user', userRouter);

/*
Serve home.html when the client accesses /home.
*/
app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'home.html'), (err) => {
        if (err) {
            next(err);
        }
    });
});

/*
Handle errors and return HTTP status 500.
*/
app.use((err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).send('Server Error');
});

// Start the server.
const PORT = process.env.PORT || process.env.port || 8081;

app.listen(PORT, () => {
    console.log(`Web Server is listening at port ${PORT}`);
});
