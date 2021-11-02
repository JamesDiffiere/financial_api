const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("../models/connect");

const bankOwners = sequelize.define('belvo_owners',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    link: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    document_type: {
        type: DataTypes.STRING
    },
    document_number: {
        type: DataTypes.STRING
    },
    collected_at: {
        type: DataTypes.DATE
    },
    display_name: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    second_last_name: {
        type: DataTypes.STRING
    },
    internal_identification: {
        type: DataTypes.STRING
    }
},{
    tableName: 'belvo_owners',
    timestamps: false
});

module.exports = bankOwners;
