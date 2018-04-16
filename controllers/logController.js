var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/log');

router.post('/log', (req,res) => {
    User.create({
        description: description,
        result: result,
        owner: owner
    }).then()
});

// router.get('/log', (req,res) => {

// })

// router.get('/log/:id', (req,res) => {

// })

// router.put('/log/:id', (req,res) => {

// })

// router.delete('/log/:id', (req,res) => {

// })

module.exports = router;