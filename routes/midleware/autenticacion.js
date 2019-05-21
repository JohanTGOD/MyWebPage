const jwt=require('jsonwebtoken');

let verificarToken = (req,res,next)=>{

    //Esto es para tomar el valor de un header de una peticion
    let token = req.get('token');

    //El valida el token que se envia en el header con el seed y segun eso da una respuesta
    jwt.verify(token,process.env.SEED,(err,coded)=>{


        if (err) {
            return res.status(401).json({
                ok: false,
                err:{
                    message: "Token no valido"
                }
            })
        }

        req.usuario = coded.usuario;
        next();
    })

}


let verificarRol= (req,res,next)=>{

    let rol = req.usuario.role

    if (rol != "ADMIN_ROLE") {
        
        return res.json({
            ok:false,
            error :{
                message:"Solo el usuario administrador puede hacer estos procedimientos"
            }
        })
        
    }
    next();



}



module.exports={
    verificarToken,verificarRol
}