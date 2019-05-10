const express = require('express')
const app = express()
const jwt=require('jsonwebtoken');
const bcript= require('bcrypt')
const Usuario= require('../../models/createUserModel/userModel')
const  path = require('path');
const hbs= require('hbs');

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

app.post('/login', function (req, res) {
    console.log("entro");
    let body = req.body;
    Usuario.findOne({usuario: body.user},(err,usuarioDB)=>{
        console.log("entro2");
        if (err) {
            console.log("entro2.1");
            return res.status(400).json({
                ok:false,
                err

            })
        }
        console.log("entro2.2");
        if (!usuarioDB) {
            console.log("entro3");
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'Usuario o contraseña incorrectos1'
                    }
    
                })
            
        }
        console.log("entro3.3");
        //El bcript lo uso para comparar lo que envian y lo comparo con la informacion encriptada en bd
        //Esto lo que quiere decir es que si no hizo match entra
        //valida que las contraseñas sean las mismas
        if (!bcript.compareSync(body.passwd, usuarioDB.passwd)) {
            console.log("entro4");
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'Usuario o contraseña incorrectos2'
                    }
    
                })
            
        }
        let token = jwt.sign({
            
            usuario:usuarioDB
            //De esta forma le digo que el usuario expirar en 30 dias
        },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});

        console.log("entroFinal");
        res.render('./UserLogin/login',{
            nombre: `${usuarioDB.nombre}`
        })


    })
  })

  module.exports=app;