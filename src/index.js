const express = require("express");
const port = 3000;
const app = express();
const bp = require("body-parser");
const { db } = require("./db");

// register middleware
app.use(bp.json());

// route registration
app.get("/", (req, res) => {
    res.json({ ok: true });
});

// server listening

db()
    .then(() => {
        console.log("Connected to database!!");
        app.listen(port, err => {
            if (err) {
                console.log("Something bad happened! " + err.message);
                return;
            }
            console.log(`Server listening on http://localhost:${port}...`);
        });
    })
    .catch(err => {
        console.error(err);
    });
