const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("../models/connect");

const bankTransactions = sequelize.define('belvo_transactions',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    id_account: {
        type: DataTypes.INTEGER
    },
    id_account_large:{
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    type: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    status: {
        type: DataTypes.STRING
    },
    balance: {
        type: DataTypes.DOUBLE(10,2)
    },
    category: {
        type: DataTypes.STRING
    },
    currency: {
        type: DataTypes.STRING
    },
    merchant_name: {
        type: DataTypes.STRING
    },
    reference: {
        type: DataTypes.STRING
    },
    value_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.STRING
    },
    collected_at: {
        type: DataTypes.DATE
    },
    observations: {
        type: DataTypes.STRING
    },
    accounting_date: {
        type: DataTypes.STRING
    },
    internal_identification: {
        type: DataTypes.STRING
    }
},{
    tableName: 'belvo_transactions',
    timestamps: false
});

module.exports = bankTransactions;
