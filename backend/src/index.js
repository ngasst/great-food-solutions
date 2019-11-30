const express = require("express");
const port = 5000;
const app = express();
const bp = require("body-parser");
var cors = require('cors');
const { db } = require("./db");
const { registerRoutes } = require("./routes");
 
// register middleware
app.use(bp.json());
app.use(cors());

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
