var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/user', (req,res) => {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)

    }).then(
        createSuccess = (user) => {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        createError = (err) => {
            res.send(500, err.message);
        }
    );
});

router.post('/login', (req,res) => {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        (user) => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, (err, matches) => {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "it's Turbo Time!",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "you are not John Connor"});
                    }
                });
            } else { 
                res.status(500).send({ error: "Hosta La Vista Baby!"});
            }
        },
        (err) => {
                res.status(501).send({ error: "everybody get down!"});
        }
    );
});

module.exports = router;