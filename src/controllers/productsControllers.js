const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getAllProducts = (req, res) => {
  try {
    const products = readProductsFromFile();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Error al obtener todos los productos' });
  }
};

const getProductById = (req, res) => {
  try {
    const productId = req.params.pid;
    const products = readProductsFromFile();
    const product = products.find(prod => prod.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ error: 'Error al obtener el producto por ID' });
  }
};

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

const updateProduct = (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const products = readProductsFromFile();
    const index = products.findIndex(prod => prod.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      writeProductsToFile(products);
      res.json(products[index]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto por ID:', error);
    res.status(500).json({ error: 'Error al actualizar el producto por ID' });
  }
};

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

function readProductsFromFile() {
  const productsData = fs.readFileSync('productos.json', 'utf-8');
  return JSON.parse(productsData);
}

function writeProductsToFile(products) {
  fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
