const express = require("express");
const port = 3000;
const app = express();
const bp = require("body-parser");
const { db } = require("./db");
const { Bill } = require("./models");

// register middleware
app.use(bp.json());

// route registration
app.get("/", (req, res) => {
    // creer une facture et la renvoyer au client
    // const bill = new Bill({
    //     number: "190830567"
    // });
    // bill.save()
    //     .then(doc => {
    //         res.json(doc);
    //     })
    //     .catch(err => {
    //         res.status(500).send(err.toString());
    //     });
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
