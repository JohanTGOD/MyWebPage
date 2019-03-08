const express = require('express')
const app = express()
const bcript= require('bcrypt')
const Usuario= require('../models/data/singUp')



app.post('/enviarInfo', function (req, res) {

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
      passwd: body.paswd

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