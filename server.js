const express = require('express')
const app = express()
let bodyParser = require('body-parser');
require('./config/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname+'/public'))
app.use(require('./routes/index'));
app.listen(process.env.PORT,()=>{

    console.log("Escuchando puerto: ",process.env.PORT)
    })

