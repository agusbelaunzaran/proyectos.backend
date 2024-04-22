const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const createCart = (req, res) => {
  try {
    const newCart = {
      id: uuidv4(), // Generar un nuevo ID único
      products: []
    };
    writeCartToFile(newCart);
    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error al crear un nuevo carrito:', error);
    res.status(500).json({ error: 'Error al crear un nuevo carrito' });
  }
};

const getCartById = (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = readCartFromFile();
    res.json(cart.products);
  } catch (error) {
    console.error('Error al obtener el carrito por ID:', error);
    res.status(500).json({ error: 'Error al obtener el carrito por ID' });
  }
};

const addProductToCart = (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    let cart = readCartFromFile();
    const index = cart.products.findIndex(item => item.product === productId);
    if (index !== -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    writeCartToFile(cart);
    res.json(cart);
  } catch (error) {
    console.error('Error al agregar un producto al carrito:', error);
    res.status(500).json}}