const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const clavePrevenciones = sequelize.define('circulo_clave_prevenciones',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    numeroContrato: {
        type: DataTypes.STRING
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    nombreOtorgante: {
        type: DataTypes.STRING
    },
    fechaReporte: {
        type: DataTypes.DATE
    },
    clavePrevencion: {
        type: DataTypes.STRING
    }
},{
    tableName: 'circulo_clave_prevenciones',
    timestamps: false
});

module.exports = clavePrevenciones;

    
    
    
