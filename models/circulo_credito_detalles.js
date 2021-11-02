const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const creditoDetalles = sequelize.define('circulo_credito_detalles',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_credito_general: {
        type: DataTypes.INTEGER
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    vigente: {
        type: DataTypes.DOUBLE(10,2)
    },
    dias29: {
        type: DataTypes.DOUBLE(10,2)
    },
    dias59: {
        type: DataTypes.DOUBLE(10,2)
    },
    dias89: {
        type: DataTypes.DOUBLE(10,2)
    },
    dias119: {
        type: DataTypes.DOUBLE(10,2)
    },
    dias179: {
        type: DataTypes.DOUBLE(10,2)
    },
    MasDias180: {
        type: DataTypes.DOUBLE(10,2)
    },
    actualizacion: {
        type: DataTypes.DATE
    },
    fechaCierre: {
        type: DataTypes.DATE
    },
    pagoEfectivo: {
        type: DataTypes.DOUBLE(10,2)
    },
    quita: {
        type: DataTypes.DOUBLE(10,2)
    },
    dacionPago: {
        type: DataTypes.DOUBLE(10,2)
    },
    quebrantoCastigo: {
        type: DataTypes.DOUBLE(10,2)
    },
    historia: {
        type: DataTypes.DOUBLE(10,2)
    },
    atrasoMayor: {
        type: DataTypes.INTEGER
    },
    registroImpugnado: {
        type: DataTypes.STRING
    }
},{
    tableName: 'circulo_credito_detalles',
    timestamps: false
});

module.exports = creditoDetalles;



    
    
    
    



