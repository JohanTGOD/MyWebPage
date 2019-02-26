const express = require('express')
const app = express()
require('../models/conectdb') 
app.use(require('./Usuario'));
app.use(require('./createUser'));
app.use(require('./login'));

module.exports = app;