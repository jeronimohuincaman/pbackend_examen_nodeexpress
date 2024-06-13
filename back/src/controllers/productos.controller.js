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

/**
 *  GET /productos/ordenados: Obtener una lista de productos ordenada según uno
 * de los siguientes criterios (nombre, precio, cantidad). El criterio de ordenación
 * debe ser pasado como un parámetro de consulta (query parameter).
*/
router.get('/ordenados', async (req, res) => {
    const { query } = req;
    try {
        const productos = await Producto.findAll();
        let filteredProductos = [...productos];

        if (!query.sort) {
            return res.status(400).json({ success: false, message: 'No ha proporcionado una condicion de ordenamiento' });
        }

        if (query.sort === 'nombre') {
            filteredProductos = productos.sort((a, b) => a.nombre.localeCompare(b.nombre))
        } else if (query.sort === 'precio') {
            filteredProductos = productos.sort((a, b) => b.precio - a.precio);
        } else if (query.sort === 'cantidad') {
            filteredProductos = productos.sort((a, b) => b.cantidad - a.cantidad);
        } else {
            return res.status(400).json({ success: false, message: 'No se puede ordenar por esa condicion' });
        }

        res.status(200).json({ success: true, result: productos, message: 'Productos obtenido con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al obtener productos' });
    }
});

/**
* GET /productos/filtrados: Obtener una lista de productos que cumplan con
* ciertas condiciones. Por ejemplo, productos cuyo precio sea mayor a un valor dado
* o productos que pertenezcan a una categoria específica. Las condiciones deben ser
* pasadas como parámetros de consulta.
 */
router.get('/filtrados', async (req, res) => {
    const { query } = req;
    const categoriaBuscada = query.categoria

    try {
        const productos = await Producto.findAll();
        let filteredProductos = [...productos];

        if (!query.categoria) {
            return res.status(400).json({ success: false, message: 'No ha proporcionado una categoria de filtrado' });
        }

        filteredProductos = productos.filter(p => p.categoria.toLowerCase().includes(categoriaBuscada.toLowerCase()));

        res.status(200).json({ success: true, result: filteredProductos, message: 'Productos obtenido con exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, message: 'Error al obtener productos' });
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

//Obtener un solo registro
router.get('/:idproducto', async (req, res) => {
    const { params } = req;
    try {
        //Manejar caso de exito
        const producto = await Producto.findByPk(idproducto);
        res.status(200).json({ success: true, result: producto, message: 'Producto obtenido ssscon exito' });
    } catch (error) {
        //Manejar caso de error
        res.status(400).json({ success: false, result: "Producto", message: 'Error al obtener producto' });
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