const {Sequelize, Model, DataTypes} = require("sequelize");
var sequelize = require("./connect");

const consultasInstitucionales = sequelize.define('circulo_consultas_institucionales',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    ultimos3meses: {
        type: DataTypes.INTEGER
    },
    ultimos12meses: {
        type: DataTypes.INTEGER
    },
    ultimos24meses: {
        type: DataTypes.INTEGER
    },
    mas24meses: {
        type: DataTypes.INTEGER
    },
    tipo_institucion: {
        type: DataTypes.STRING
    }
},{
    tableName: 'circulo_consultas_institucionales',
    timestamps: false
});

module.exports = consultasInstitucionales;


    


    
    
    
    



