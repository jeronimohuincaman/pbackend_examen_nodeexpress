const { Sequelize, DataTypes, Model, UUID } = require('sequelize');

const sequelize = new Sequelize('pbackend_examen_nodeexpress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida con exito...')
    } catch (error) {
        console.log('No se pudo realizar la conexion a la base de datos...')
    }
}
testConnection();

class Auto extends Model { };

//Definir estructura en sequelize
Auto.init({
    idauto: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER, //0: nuevo, 1: usado
        allowNull: false
    },
    km: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    moneda: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { sequelize, modelName: "Auto" })

module.exports = Auto;

// "modelo": "f100",
// "anio":1976,
// "estado": "usado",
// "km": 120,
// "precio":150000,
// "moneda":"dolares",
// "caracteristicas":"Es una pickup en muy buen estado ideal para el trabajo y uso cotidiano"