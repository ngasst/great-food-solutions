const express = require("express");
const port = 3000;
const app = express();
const bp = require("body-parser");
const { db } = require("./db");
const { Bill, testModels } = require("./models");

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

app.get("/test", (req, res) => {
    const resp = [
        {
            path: "/test/models",
            description:
                "tests that all the models of the application are functioning correctly"
        }
    ];
    res.json(resp);
});

app.get("/test/models", (req, res) => {
    testModels()
        .then(results => {
            if (results) {
                res.json({
                    ok: true,
                    payload: results
                });
            } else {
                res.json({ ok: true, payload: null });
            }
        })
        .catch(err => {
            res.status(500).json({ ok: false, payload: err });
        });
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
