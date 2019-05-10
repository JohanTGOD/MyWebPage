const express = require('express')
const app = express()
const jwt=require('jsonwebtoken');
//esta informacion la saco de la pagina
//https://developers.google.com/identity/sign-in/web/backend-auth
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//Esta es una libreria muy grande de apoyo que funciona para dar mas propiedades a javascript node and mongo
const _=require('underscore');
const hbs= require('hbs');
const Usuario = require('../../models/createUserModel/userModel');



hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');


app.get('/google', function (req, res) {
  res.render('./allAboutUsers/google')
})


//Configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    
    return {
        nombre:payload.name,
        email:payload.email,
        google:true

    }
  }




app.post('/google',  async(req, res)=> {
    let body = req.body;
    let token = body.idtoken;
    let usuarioGoogle = await verify(token).catch(err=>{
        return res.status(402).json({
            ok:false,
            err
        })
    })

    // res.json({
    //     usuarioGoogle
    // })

    Usuario.findOne({correo:usuarioGoogle.email},(err,usuarioDB)=>{
      
      if(err){

        return res.status(500).json({
          ok: false,
          err

        })
      }
      //esto significa si existe el usuairo de google
      if (usuarioDB) {
        if(usuarioDB.google===false){
          return res.status(400).json({
            ok: false,
            err:{
              message: "Usted no se autentico por medio de google"
            }
  
          })
        }else{
          console.log("Si se autentico");
          let token = jwt.sign({
            usuario:usuarioDB
            //De esta forma le digo que el usuario expirar en 30 dias
        },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});
        return res.json({
          ok:true,
          usuario:usuarioDB,
          token
        })
        }
      }
      //si el usuario no existe en base de datos
      else{
        console.log("Si se autentico2");
        console.log(usuarioGoogle.nombre);
        let usuario = new Usuario({
          nombre: usuarioGoogle.nombre,
          apellido:usuarioGoogle.nombre,
          correo:usuarioGoogle.email,
          usuario:usuarioGoogle.nombre,
          passwd:":C",
          google:true
        });
        
        usuario.save((err,usuarioDB)=>{
          if(err){

            return res.status(500).json({
              ok: false,
              err
    
            })
          }
          console.log("Si se autentico3");
          let token = jwt.sign({
            usuario:usuarioDB
            //De esta forma le digo que el usuario expirar en 30 dias
        },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});
        return res.json({
          ok:true,
          usuario:usuarioDB,
          token
        })


        }


        )}
    })
  })


 
module.exports=app