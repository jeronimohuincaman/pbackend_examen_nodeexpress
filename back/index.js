//Importacion de dependencias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

//Utilizacion de dependencias
app.use(cors());
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importacion de controllador de rutas
const autosRoute = require('./src/controllers/auto.controller');

//Mensaje de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({message: 'Bienvenidos a mi super sistema!'});
    });
    
//Utilizacion de controllador de rutas
app.use('/autos', autosRoute)

//Verificador
app.listen(port, () => {
    console.log('corriendo en servidor en puerto:', port);
});