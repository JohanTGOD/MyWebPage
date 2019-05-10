const express = require('express')
const app = express()
const Usuario= require('../../models/createUserModel/userModel')


app.get('/allUsers', function (req, res) {


    //Voy a hacer un filtro donde especifique la paginas de cuantos usuarios quiero ver y desde que id de usuario quiero ver
        // se hace con req.query.nombreVariable
    //Esto filtro se va a colocar en la url por ejemplo {{url}}/allUsers?desde=5

       

    let desde = req.query.inicio || 0;
    desde= Number(desde)
    let cantidadAMostrar = req.query.paginacion || 5;
    cantidadAMostrar=Number(cantidadAMostrar)

    //En esta parte del find le digo que campos quiero mostrar de mi modelo
    Usuario.find({},'correo usuario nombre apellido')
           .skip(desde)
           .limit(cantidadAMostrar)
           .exec((err,allUsrs)=>{
               if (err) {
                   res.status(400).json({
                       ok:false,
                       err
                   })
               }
               res.json({
                   ok:true,
                   allUsrs
               })
           })
 })

  module.exports=app;