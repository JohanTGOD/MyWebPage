const express = require('express')
const app = express()
require('../models/conectdb') 
app.use(require('./mainRouts/Home'));
app.use(require('./createUserRouts/Usuario'));
app.use(require('./createUserRouts/createUser'));
app.use(require('./createUserRouts/login'));
app.use(require('./createUserRouts/google'));

module.exports = app;

