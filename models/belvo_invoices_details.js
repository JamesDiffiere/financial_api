const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const invoices_details = sequelize.define('belvo_invoice_details',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_invoices: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.DOUBLE(10,2)
    },
    unit_code: {
        type: DataTypes.STRING
    },
    tax_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    description: {
        type: DataTypes.STRING
    },
    unit_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    total_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    pre_tax_amount: {
        type: DataTypes.DOUBLE(10,2)
    },
    retained_taxes: {
        type: DataTypes.DOUBLE(10,2)
    },
    tax_percentage: {
        type: DataTypes.DOUBLE(10,2)
    },
    unit_description: {
        type: DataTypes.STRING
    },
    product_identification: {
        type: DataTypes.STRING
    }
},{
    tableName: 'belvo_invoice_details',
    timestamps: false
});

module.exports = invoices_details;


    


    
