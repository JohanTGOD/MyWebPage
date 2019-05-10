const mongoose = require('mongoose');
//Esto es para que los mensajes se entiendan
const uniqueValidator= require('mongoose-unique-validator');

let rolesValidos= {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido'
};

let Schema=mongoose.Schema;

let newUsuario= new Schema(
    {
        nombre:{
            type:String,
            required:[true,"El nombre es necesario"]
        },
        apellido:{
            type:String,
            required:[true,"El apellido es necesario"]
        },
        correo:{
            type:String,
            required:[true,"El correo es obligatorio"],
            /**El unique hace que valide que el correo sea unico por usuario */
            unique:true
        },
        usuario:{
            type:String,
            required:[true,"El nombre de usuario es obligatorio"],
            unique:true
        },
        passwd:{
            type:String,
            required:[true,"La contraseña es requerida"]
        },
        google:{
            type:Boolean,
            default:false
            
        },
        role:{
            type:String,
            default:'USER_ROLE',
            enum:rolesValidos
        },
        estado:{
            type:Boolean,
            default:true
        }

    }
)

//Esto es para que no se envie info de passwd
newUsuario.methods.toJSON = function(){

    let user= this;
    let userObject = user.toObject();
    delete userObject.passwd;

    return userObject;
}

//Esto es para validaciones del correo
//ya que la libreria unique solo se a puesto en el modelo-campo corro
newUsuario.plugin(uniqueValidator,{
    message:'{PATH} debe de ser unico'
})

module.exports=mongoose.model('Usuario',newUsuario)