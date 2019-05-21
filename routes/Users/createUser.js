const express = require('express')
const app = express()
const bcript= require('bcrypt')
const Usuario= require('../../models/createUserModel/userModel')
const {verificarToken,verificarRol} = require('../midleware/autenticacion');


//Tengo dos midelwares uno valida el token y el otro el rol del admin que es el unico que puede editar
app.post('/enviarInfo',[verificarToken,verificarRol], function (req, res) {

    let body = req.body;
    console.log(body.paswd);
    if (body.paswd != "") {
      console.log("esta en el if");
      body.paswd=bcript.hashSync(body.paswd,10) 
    }
    
    let usuario = new Usuario({
      nombre: body.nombre,
      apellido: body.apellido,
      correo: body.correo,
      usuario: body.usuario,
      passwd: body.paswd,
      role:body.role

    })

    usuario.save((err,usuariodb)=>{
      if (err) {
       return   res.status(400).json({

              ok:false,
              err
          })
      }

      res.json({
          ok:true,
          usuario:usuariodb  
      })
    })
  })

  module.exports=app;