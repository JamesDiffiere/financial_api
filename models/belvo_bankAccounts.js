const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("../models/connect");

const bankAccounts = sequelize.define('belvo_bankAccounts',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_account_large: {
        type: DataTypes.STRING
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE
    },
    internal_identification: {
        type: DataTypes.STRING
    },
    agency: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    bank_product_id: {
        type: DataTypes.INTEGER
    },
    public_identification_name: {
        type: DataTypes.STRING
    },
    public_identification_value: {
        type: DataTypes.STRING
    },
    currency: {
        type: DataTypes.STRING
    },
    credit_data: {
        type: DataTypes.STRING
    },
    loan_data: {
        type: DataTypes.STRING
    },
    collected_at: {
        type: DataTypes.DATE
    },
    last_accessed_at: {
        type: DataTypes.DATE
    },
    balance: {
        type: DataTypes.DOUBLE(10,2)
    }
},{
    tableName: 'belvo_bankAccounts',
    timestamps: false
});

module.exports = bankAccounts;
