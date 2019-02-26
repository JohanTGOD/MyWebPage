const express = require('express')
const app = express()
const jwt=require('jsonwebtoken');
const bcript= require('bcrypt')
const Usuario= require('../models/data/singUp')

app.post('/login', function (req, res) {

    let body = req.body;
    Usuario.findOne({usuario: body.usuario},(err,usuarioDB)=>{

        if (err) {
            return res.status(500).json({
                ok:false,
                err

            })
        }

        if (!usuarioDB) {
            if (err) {
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'Usuario o contraseña incorrectos'
                    }
    
                })
            }
        }

        //El bcript lo uso para comparar lo que envian y lo comparo con la informacion encriptada en bd
        //Esto lo que quiere decir es que si no hizo match entra
        //valida que las contraseñas sean las mismas
        if (!bcript.compareSync(body.passwd, usuarioDB.passwd)) {
            if (err) {
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'Usuario o contraseña incorrectos'
                    }
    
                })
            }
        }
        let token = jwt.sign({
            usuario:usuarioDB
            //De esta forma le digo que el usuario expirar en 30 dias
        },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        })


    })
  })

  module.exports=app;