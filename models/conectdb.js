const mongoose = require('mongoose');
// Connection URL
const url = process.env.URLDB;
 

 
// Use connect method to connect to the server
mongoose.connect(url,(err, res)=>{

    if (err) {
        throw new err;
    }else{

        console.log("Base de datos conectada");

    }
})



module.exports=mongoose;