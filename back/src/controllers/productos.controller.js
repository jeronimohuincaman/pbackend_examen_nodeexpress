const express = require('express');
const router = express.Router();

const Producto = require('../models/productos.model');

//Obtener registros
router.get('/', async (req, res) => {
    const { query } = req;
    try {
        //Manejar caso de exito
        const productos = await Producto.findAll();
        res.status(200).json({ success: true, result: productos, message: 'Productos obtenidos con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, result: "Productos", message: 'Error al obtener productos' });
    }
});

//Obtener un solo registro
router.get('/:idproducto', async (req, res) => {
    const { params } = req;
    const idproducto = params.idproducto;
    try {
        //Manejar caso de exito
        const producto = await Producto.findByPk(idproducto);
        res.status(200).json({ success: true, result: producto, message: 'Producto obtenido con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, result: "Producto", message: 'Error al obtener producto' });
    }
});

//Crear registro
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        //Manejar caso de exito
        await Producto.sync();
        //Encapsular datos recibidos
        const nuevoProducto = await Producto.create({
            //propiedad: valor,
            nombre: body.nombre,
            precio: body.precio,
            cantidad: body.cantidad,
            categoria: body.categoria
        })

        res.status(201).json({ success: true, result: nuevoProducto, message: 'Producto creado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }
});

//Editar registro
router.put('/:idproducto', async (req, res) => {
    const { body } = req;
    const { idproducto } = req.params;

    try {
        //Manejar caso de exito
        const producto = await Producto.findByPk(idproducto);
        if (!producto) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        //Encapsular datos recibidos
        const updatedProducto = await producto.update(body);
        res.status(200).json({ success: true, result: updatedProducto, message: 'Producto actualizado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al actualizar el producto' });
    }
});

//Eliminar registro
router.delete('/:idproducto', async (req, res) => {
    const { idproducto } = req.params;
    try {
        //Manejar caso de exito
        const producto = await Producto.findByPk(idproducto);
        if (!producto) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        //Eliminamos registro
        await producto.destroy();
        res.status(200).json({ success: true, result: producto, message: 'Producto eliminado con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al eliminar el producto' });
    }
});



module.exports = router;