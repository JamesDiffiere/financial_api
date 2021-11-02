const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const clavesBanxico = sequelize.define('circulo_claves_banxico',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    clavesBanxico: {
        type: DataTypes.STRING
    }
},{
    tableName: 'circulo_claves_banxico',
    timestamps: false
});

module.exports = clavesBanxico;




    
    
    
    
    
