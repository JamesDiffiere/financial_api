const usuarios = require("../models/usuarios");


const validateUser = (correo)=>{
    return new Promise(async function(resolve, reject){
        var usuario = await usuarios.findAll({
            where: {
              correo: correo
            }
        });
    
        if(usuario.length == 0){
            var user = await usuarios.create({ correo: correo, password: 123 });
            user = JSON.stringify(user)
            user = JSON.parse(user);
            console.log(user);
            resolve(user); 
            
        }else{
            var user = usuario;
            user = JSON.stringify(user)
            user = JSON.parse(user);
            user = user[0];
            resolve(user); 
        }
        
    })
}

module.exports = {validateUser};