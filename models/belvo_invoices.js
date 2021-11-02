const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("../models/connect");

const invoices = sequelize.define('belvo_invoices',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING
    },
    invoice_type: {
        type: DataTypes.STRING
    },
    invoice_identification: {
        type: DataTypes.STRING
    },
    subtotal_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    tax_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    discount_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    total_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    currency: {
        type: DataTypes.STRING
    },
    exchange_rate: {
        type: DataTypes.DOUBLE(10,4)
    },
    status: {
        type: DataTypes.STRING
    },
    sender_name: {
        type: DataTypes.STRING
    },
    sender_id: {
        type: DataTypes.STRING
    },
    receiver_name: {
        type: DataTypes.STRING
    },
    receiver_id: {
        type: DataTypes.STRING
    },
    certification_authority: {
        type: DataTypes.STRING
    },
    certification_date: {
        type: DataTypes.DATE
    },
    cancelation_status: {
        type: DataTypes.STRING
    },
    cancelation_update_date: {
        type: DataTypes.STRING
    },
    payment_type: {
        type: DataTypes.STRING
    },
    payment_method: {
        type: DataTypes.STRING
    },
    payroll: {
        type: DataTypes.STRING
    },
    collected_at: {
        type: DataTypes.DATE
    },
    usage: {
        type: DataTypes.STRING
    },
    place_of_issue: {
        type: DataTypes.STRING
    },
    version: {
        type: DataTypes.STRING
    },
    xml: {
        type: DataTypes.STRING
    },
    warnings: {
        type: DataTypes.STRING
    }
},{
    tableName: 'belvo_invoices',
    timestamps: false
});

module.exports = invoices;


    
