const jwt=require('jsonwebtoken');

let verificarToken = (req,res,next)=>{

    //Esto es para tomar el valor de un header de una peticion
    let token = req.get('token');

    jwt.verify(token,process.env.SEED,(err,coded)=>{


        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = coded.usuario;
        next();
    })

}



module.exports={
    verificarToken
}