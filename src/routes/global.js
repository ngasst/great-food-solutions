const { Bill, testModels } = require("../models");
function registerGlobalRoutes(app) {
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
}

module.exports = {
    registerGlobalRoutes
};
