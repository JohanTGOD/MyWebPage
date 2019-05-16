const express = require('express')
const app = express()
const Usuario= require('../../models/createUserModel/userModel')
const {verificarToken} = require('../midleware/autenticacion')


//El valor de verificar token es un midelwer que no va a dejar que eso no se ejecue hasta que todo este bien
app.get('/allUsers',verificarToken, function (req, res) {


    //Voy a hacer un filtro donde especifique la paginas de cuantos usuarios quiero ver y desde que id de usuario quiero ver
        // se hace con req.query.nombreVariable
    //Esto filtro se va a colocar en la url por ejemplo {{url}}/allUsers?desde=5

       

    let desde = req.query.inicio || 0;
    desde= Number(desde)
    let cantidadAMostrar = req.query.paginacion || 10;
    cantidadAMostrar=Number(cantidadAMostrar)

    //En esta parte del find le digo que campos quiero mostrar de mi modelo
    // en el find puedo hacer una especie de filtro donde puedo decir estado = true y me trae todos los usuarios con estado true
    Usuario.find({},'correo usuario nombre apellido')
           .skip(desde)
           .limit(cantidadAMostrar)
           .exec((err,allUsrs)=>{
               if (err) {
                   res.status(401).json({
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