const express = require("express");
const port = 5000;
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const bp = require('body-parser');
var cors = require('cors');
const { db } = require("./db");
const { User } = require('./models')
const { registerRoutes } = require('./routes');
 
// register middleware
app.use(bp.json());
app.use(cors());

// route registration
registerRoutes(app);

// authentication
const mySecret = "greatFoodSolutionForLife*%001";
module.exports.mySecret = mySecret;
app.use(passport.initialize());
passport.use(new LocalStrategy({
    usernameField: "email"
},
    (username, password, done) => {
        User.findOne({email: username})
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                const hash = bcrypt.compareSync(password, user.password);
                if(!hash) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            })
    }
))

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