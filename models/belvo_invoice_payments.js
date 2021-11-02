const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const invoice_payments = sequelize.define('belvo_invoice_payments',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_invoices: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    },
    amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    currency: {
        type: DataTypes.STRING
    },
    payer_rfc: {
        type: DataTypes.STRING
    },
    payment_type: {
        type: DataTypes.INTEGER
    },
    exchange_rate: {
        type: DataTypes.DOUBLE(10,4)
    },
    beneficiary_rfc: {
        type: DataTypes.STRING
    },
    payer_bank_name: {
        type: DataTypes.STRING
    },
    operation_number: {
        type: DataTypes.STRING
    },
    payer_account_number: {
        type: DataTypes.STRING
    },
    beneficiary_account_number: {
        type: DataTypes.STRING
    }
},{
    tableName: 'belvo_invoice_payments',
    timestamps: false
});

module.exports = invoice_payments;


    

    
