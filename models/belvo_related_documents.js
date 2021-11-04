const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const related_documents = sequelize.define('belvo_related_documents',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    id_payments: {
        type: DataTypes.INTEGER
    },
    currency: {
        type: DataTypes.STRING
    },
    amount_paid: {
        type: DataTypes.DOUBLE(10,2)
    },
    installment: {
        type: DataTypes.INTEGER
    },
    payment_method: {
        type: DataTypes.STRING
    },
    previous_balance: {
        type: DataTypes.DOUBLE(10,2)
    },
    outstanding_balance: {
        type: DataTypes.DOUBLE(10,2)
    },
    invoice_identification: {
        type: DataTypes.STRING
    }
},{
    tableName: 'belvo_related_documents',
    timestamps: false
});

module.exports = related_documents;





    
