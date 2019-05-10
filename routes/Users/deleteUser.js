const express = require('express')
const app = express()
const Usuario= require('../../models/createUserModel/userModel')


app.delete('/User/:id', function (req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id,(err,usuarioDelete)=>{
        if (err) {
            res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDelete
        })

    })

 })

  module.exports=app;