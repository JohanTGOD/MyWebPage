const express = require('express')
const app = express()

//Esta es una libreria muy grande de apoyo que funciona para dar mas propiedades a javascript node and mongo
const _=require('underscore');
const hbs= require('hbs');



hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');


app.get('/Registrar', function (req, res) {
  res.render('./allAboutUsers/Registrar')
})


 
module.exports=app