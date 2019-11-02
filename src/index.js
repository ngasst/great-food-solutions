const express = require("express");
const port = 3000;
const app = express();
const bp = require("body-parser");
const { db } = require("./db");
const { registerRoutes } = require("./routes"); 
// register middleware
app.use(bp.json());

// route registration
registerRoutes(app);

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
