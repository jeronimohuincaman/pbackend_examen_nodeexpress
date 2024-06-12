const { Sequelize, DataTypes, Model } = require('sequelize');

/**
 * Conexion con nuestra base de datos
 */
const sequelize = new Sequelize('pbackend_examen_nodeexpress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

/**
 * Verificamos la conexion con nuestra base de datos
 */
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida con exito...')
    } catch (error) {
        console.log('No se pudo realizar la conexion a la base de datos... Fijate si levantaste MySQL')
    }
}
testConnection();

class Producto extends Model { };

//Definir estructura en sequelize. Si no existe la tabla, la crea.
Producto.init({
    idproducto: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: "Producto" });

module.exports = Producto;