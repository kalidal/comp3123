
const express = require('express');
const path = require('path');
const routerUser = express.Router();

// Read user information from user.json.
const user = require('../user.json');

/*
Return all details from user.json as JSON.
GET /api/v1/user/profile
*/
routerUser.get('/profile', (req, res) => {
    res.json(user);
});

/*
Accept username and password from a JSON  body.
*/
routerUser.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check the username first.
    if (username !== user.username) {
        return res.status(401).json({
            status: false,
            message: "User Name is invalid"
        });
    }

    // Check the password after the username is valid.
    if (password !== user.password) {
        return res.status(401).json({
            status: false,
            message: "Password is invalid"
        });
    }

    // Both username and password are valid.
    return res.json({
        status: true,
        message: "User Is valid"
    });
});

/*
Accept username as a URL parameter and return an HTML message.
GET /api/v1/user/logout/bret
*/
routerUser.get('/logout/:username', (req, res) => {
    const username = req.params.username;

    res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;
