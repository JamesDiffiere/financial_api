const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const usuarios = sequelize.define('usuarios',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    correo: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},{
    tableName: 'usuarios',
    timestamps: false
});

module.exports = usuarios;



    

    

    
    
    
    



    
