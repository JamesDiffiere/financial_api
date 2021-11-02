const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const accionistasAvales = sequelize.define('circulo_accionistas_avales',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    RFC: {
        type: DataTypes.STRING
    },
    CURP: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    segundoNombre: {
        type: DataTypes.STRING
    },
    apellidoPaterno: {
        type: DataTypes.STRING
    },
    apellidoMaterno: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    porcentaje_accion: {
        type: DataTypes.DOUBLE(10,2)
    },
    monto_avalado: {
        type: DataTypes.DOUBLE(10,2)
    }
},{
    tableName: 'circulo_accionistas_avales',
    timestamps: false
});

module.exports = accionistasAvales;



    