const express = require('express')
const app = express()
let bodyParser = require('body-parser');
const  path = require('path');
require('./config/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(__dirname+'/public'))
//Esta metodo de path me ayuda a no tener incovenientes en las ruta, si quiere puede hacer un clg 
app.use(express.static(path.resolve(__dirname,'./public')));
app.use(require('./routes/index'));


app.listen(process.env.PORT,()=>{
    console.log("Escuchando puerto: ",process.env.PORT)
    })

