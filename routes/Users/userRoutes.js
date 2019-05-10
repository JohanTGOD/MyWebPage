const express = require('express')
const app = express()
require('../../models/conectdb') 

app.use(require('./OldRegister'));
app.use(require('./createUser'));
app.use(require('./updateUser'));
app.use(require('./getUser'));
app.use(require('./deleteUser'));
app.use(require('./login'));
app.use(require('./google'));

module.exports = app;
