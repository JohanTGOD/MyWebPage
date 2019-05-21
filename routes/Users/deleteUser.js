const express = require('express')
const app = express()
const Usuario= require('../../models/createUserModel/userModel')
const _=require('underscore');
const {verificarToken,verificarRol} = require('../midleware/autenticacion');

app.delete('/UserDefenitive/:id',[verificarToken,verificarRol], function (req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id,(err,usuarioDelete)=>{
        if (err) {
            res.status(400).json({
                ok:false,
                err
            })
        }

        if (usuarioDelete === null) {
            
               return res.status(400).json({
                    ok:false,
                    err : {
                        message:"Usuario no encontrado"
                    }
                })
           
        }

        res.json({
            ok: true,
            usuario: usuarioDelete
        })

    })

 })

 app.delete('/UserChangeStade/:id',[verificarToken,verificarRol],function(req,res){

    let id = req.params.id;

    //Esta es la forma que contiene mas seguridad y le digo
    //Que campos se pueden modificar
    //let body =_.pick(req.body,['estado']) ;

    let cambiaEstado={
        estado:false
    }

    //El run validator funciona para que haga las validaciones del skema
    Usuario.findByIdAndUpdate(id,cambiaEstado,{new: true},(err,usuarioDB)=>{

        if(err){

            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuarioDB
        })

    })
 })

  module.exports=app;