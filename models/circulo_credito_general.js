const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const creditoGeneral = sequelize.define('circulo_credito_general',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    rfc: {
        type: DataTypes.STRING
    },
    contrato: {
        type: DataTypes.STRING
    },
    nombreOtorgante: {
        type: DataTypes.STRING
    },
    saldoInicial: {
        type: DataTypes.DOUBLE(10,2)
    },
    saldoTotal: {
        type: DataTypes.DOUBLE(10,2)
    },
    moneda: {
        type: DataTypes.STRING
    },
    fechaApertura: {
        type: DataTypes.DATE
    },
    plazo: {
        type: DataTypes.INTEGER
    },
    tipoCambio: {
        type: DataTypes.STRING
    },
    clavesObservacion: {
        type: DataTypes.STRING
    },
    tipoCredito: {
        type: DataTypes.STRING
    },
    tipoInstitucion: {
        type: DataTypes.STRING
    }
},{
    tableName: 'circulo_credito_general',
    timestamps: false
});

module.exports = creditoGeneral;
