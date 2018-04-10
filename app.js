require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');


sequelize.sync();
app.use(require('./middleWare/headers'));
app.use(bodyParser.json());
app.use('/api', user);

app.listen(3000, () => {
    console.log('App is listening on 3000')
});