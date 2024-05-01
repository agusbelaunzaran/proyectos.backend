const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const viewsRouter = require('./viewsRouter');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/realtimeproducts', viewsRouter(io)); 


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto' ${PORT});
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
 
  socket.on('crearProducto', (producto) => {
    const createProduct = (req, res) => {
        try {
          const newProduct = req.body;
          newProduct.id = uuidv4(); // Generar un nuevo ID único
          const products = readProductsFromFile();
          products.push(newProduct);
          writeProductsToFile(products);
          res.status(201).json(newProduct);
        } catch (error) {
          console.error('Error al crear un nuevo producto:', error);
          res.status(500).json({ error: 'Error al crear un nuevo producto' });
        }
      };
    io.emit('productoCreado', producto);
  });

  
  socket.on('eliminarProducto', (productoId) => {
    const deleteProduct = (req, res) => {
        try {
          const productId = req.params.pid;
          let products = readProductsFromFile();
          products = products.filter(prod => prod.id !== productId);
          writeProductsToFile(products);
          res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar el producto por ID:', error);
          res.status(500).json({ error: 'Error al eliminar el producto por ID' });
        }
      };
      
    io.emit('productoEliminado', productoId);
  });

 
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});