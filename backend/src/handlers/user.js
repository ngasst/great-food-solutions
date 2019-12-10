const passport = require('passport');
const bcrypt =  require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySecret = require('../index');
const { User } = require('../models');

function getUsers(req, res) {
    User.find({})
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        })
}

function signUp(req, res) {
    if(!req.body.email || !req.body.password || Object.keys(req.body).length < 2) {
        res.json({
            ok: false,
            payload: "All required fields are not provided !"
        });
        return;
    }
    const { email, password } = req.body;
    bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            user = new User({email, password: hash})
            user
                .save()
                .then(() => {
                    res.status(200).json({ok: true, payload: null, message: `User has been signed up!`})
                })
                .catch(err => {
                    res.status(500).json({ok: false, payload: null, message: err.message})
                })
        })
        .catch(err => {
            res.status(500).json({ok: false, payload: null, message: err.message})
        })
}

function signIn(req, res) {
    if(!req.body.email || !req.body.password || Object.keys(req.body).length < 2) {
        res.json({
            ok: false,
            payload: "All required fields are not provided !"
        });
        return;
    }
    passport.authenticate("local", (err, user, info) => {
        if(err) res.status(500).json({ok: false, payload: null, message: err.message})
        if(!user) res.status(500).json({ok: false, payload: null, message: info.message})
        const token = jwt.sign(JSON.stringify(user._id), mySecret.mySecret)

        return res.status(200).json({
            ok: true,
            token,
            payload: {
                email: user.email
            }
        })
    })(req, res)
}

module.exports = {
    signUp,
    signIn,
    getUsers
}