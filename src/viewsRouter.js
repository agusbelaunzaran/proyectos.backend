const express = require('express');
const router = express.Router();

module.exports = (io) => {
  router.get('/', (req, res) => {
    
    res.render('index', { productos: obtenerProductos() });
  });

  router.post('/crearProducto', (req, res) => {
    const nuevoProducto = req.body;
    
    io.emit('crearProducto', nuevoProducto);
    res.redirect('/realtimeproducts');
  });

  router.post('/eliminarProducto', (req, res) => {
    const productoId = req.body.id;
    
    io.emit('eliminarProducto', productoId);
    res.redirect('/realtimeproducts');
  });

  return router;
};