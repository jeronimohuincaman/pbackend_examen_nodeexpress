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

}, { sequelize, modelName: "Auto" })

module.exports = Auto;