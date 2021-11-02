const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const calificacionCartera = sequelize.define('circulo_calificacion_cartera',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
    },
    calificacion: {
        type: DataTypes.STRING,
    },
    nombreOtorgante: {
        type: DataTypes.STRING,
    }
},{
    tableName: 'circulo_calificacion_cartera',
    timestamps: false
});

module.exports = calificacionCartera;






