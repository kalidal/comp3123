/**
 * Purpose:
 * - serve multiple paths from an Express server using routes
 * - serve a static html file
 * - extract GET query parameters
 * - extract POST path parameters
 * - extract POST body parameters
 */

const express = require("express");

const app = express();

const SERVER_PORT = process.env.PORT || 8088;

// -------------------- Setup middleware for Express --------------------

// Serve static files from the public folder
app.use(express.static("public"));

// Allow Express to read JSON request bodies
app.use(express.json());

// Allow Express to read URL-encoded data
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------------------------


// GET /hello
app.get("/hello", (request, response) => {
    response.status(200).send("Hello Express JS");
});


// GET /user?firstname=John&lastname=Doe
app.get("/user", (request, response) => {

    const firstname = request.query.firstname || "Pritesh";
    const lastname = request.query.lastname || "Patel";

    response.json({
        firstname: firstname,
        lastname: lastname
    });
});


// POST /user/John/Doe
app.post("/user/:firstname/:lastname", (request, response) => {

    const firstname = request.params.firstname;
    const lastname = request.params.lastname;

    response.json({
        firstname: firstname,
        lastname: lastname
    });
});


// POST /users
app.post("/users", (request, response) => {

    const users = request.body;

    response.json(users);
});


// Start the server
app.listen(SERVER_PORT, () => {
    console.log("server is running on http://localhost:" + SERVER_PORT);
});