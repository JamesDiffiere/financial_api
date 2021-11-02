const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const hbs = require('hbs');


class Server{
    constructor(){
        this.app = express();
        this.app.set('view engine', 'hbs');
        this.port = 8080;
        
        //Usuarios (Registro, Login, Auth, more...)

        this.bankPath = '/belvo'
        this.buroPath = '/cc'

        //ROUTES
        this.routes();

        //MIDDLEWARES
        this.middlewares();
    }
        

    routes(){
        this.app.use(this.bankPath,require('../routes/bankInfo'));
        this.app.use(this.buroPath,require('../routes/buroInfo'));
        
    }

    //Listener
    listen(){   
        
        this.app.listen(this.port);
    }
    
    middlewares(){
        //Directorio Publico
        this.app.use(express.static('public'));

        this.app.use(cors());
    }

}

module.exports = {Server
};
