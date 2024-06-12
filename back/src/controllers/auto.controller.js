const express = require('express');
const router = express.Router();

const Auto = require('../models/autos.model');

//Obtener registros
router.get('/', async (req, res) => {
    const { query } = req;
    try {
        //Manejar caso de exito
        const autos = await Auto.findAll();
        res.status(200).json({ success: true, result: autos, message: 'Autos obtenidos con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, result: "autos", message: 'Error al obtener autos' });
    }
});

//Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        //Manejar caso de exito
        await Auto.sync();
        //Encapsular recibidos
        const nuevoAuto = await Auto.create({
            //propiedad: valor,
            marca: body.marca,
            modelo: body.modelo,
            anio: body.anio,
            estado: body.estado,
            km: body.km,
            precio: body.precio,
            moneda: body.moneda,
            caracteristica: body.caracteristica
        })

        res.status(201).json({ success: true, result: nuevoAuto, message: 'Auto creado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }
});

//Editar registro
router.put('/:idauto', async (req, res) => {
    const { body } = req;
    const { idauto } = req.params;

    try {
        //Manejar caso de exito
        const auto = await Auto.findByPk(idauto);
        if (!auto) {
            return res.status(404).json({ success: false, message: 'Auto no encontrado' });
        }
        //Encapsular recibidos
        const updatedAuto = await auto.update(body);
        res.status(200).json({ success: true, result: updatedAuto, message: 'Auto actualizado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al actualizar el auto' });
    }
});

//Eliminar registro
router.delete('/:idauto', async (req, res) => {
    const { idauto } = req.params;
    try {
        const auto = await Auto.findByPk(idauto);
        if (!auto) {
            return res.status(404).json({ success: false, message: 'Auto no encontrado' });
        }
        await auto.destroy();
        res.status(200).json({ success: true, result: auto, message: 'Auto eliminado con exito' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al eliminar el auto' });
    }
});

module.exports = router;