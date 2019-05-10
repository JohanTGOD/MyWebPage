const express = require('express')
const app = express()

require('../models/conectdb') 

app.use(require('./Home/Home'));
app.use(require('./Users/userRoutes'));

module.exports = app;

