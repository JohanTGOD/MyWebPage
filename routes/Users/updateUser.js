const express = require('express')
const app = express()
const bcript= require('bcrypt')
const Usuario= require('../../models/createUserModel/userModel')
// Esta libreria me trae funciones adicionales para nodejs
const _=require('underscore');
const {verificarToken,verificarRol} = require('../midleware/autenticacion');

app.put('/updateUser/:id',[verificarToken,verificarRol],function(req,res){

    // Esto es para tomar el id desde la url con un slash(/)
        //Ejemplo = {{url}}/updateUser/5c7f47b365f29f0db03a41ea            ->> Este es un ID de DB
        // Se hace especificando en el get el slash y declarando una variable req.params.variable
    // Es diferente a hacerlo con un signo de interrogacion(?)
        // Ejemplo {{url}}/updateUser?variable="algo"

        
    let id = req.params.id;

    // Esta era la manera en que enviaba los objetos pero tiene
    //problemas de seguridad ahora yo uso el underscore
    //let body = req.body;


    //Esta es la forma que contiene mas seguridad y le digo
    //Que campos se pueden modificar
    let body =_.pick(req.body,['nombre','apellido','correo','usuario','role','estado']) ;

    //El run validator funciona para que haga las validaciones del skema
    Usuario.findByIdAndUpdate(id,body,{new: true,runValidators:true},(err,usuarioDB)=>{

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