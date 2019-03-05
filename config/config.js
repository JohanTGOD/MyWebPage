process.env.PORT= process.env.PORT || 3000;
//==================================
//Vencimiento del toñen
//==================================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN= 60*60*24*30;

//==================================
//seed de autenticacion
//==================================
process.env.SEED= process.env.SEED || 'este-es-el-sid-desarrollo';

//==================================
//DB
//==================================

//Base de datos

let urlDB

    if (process.env.NODE_ENV==='dev') {
        urlDB='mongodb://localhost:27017/miD' 
    }else{
        //'mongodb+srv://root:xNVaI4GC8c7QI85U@johan-vsxti.mongodb.net/cafe'
        urlDB= process.env.MONGO_MYWEBPAGE
    }
  


process.env.URLDB= urlDB;