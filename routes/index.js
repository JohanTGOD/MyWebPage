const express = require('express')
const app = express()
require('../models/conectdb') 
app.use(require('./Usuario'));
app.use(require('./createUser'));
app.use(require('./login'));
app.use(require('./google'));

module.exports = app;

