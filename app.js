const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

app.use(express.json());

app.use((req, res, next) => {
 
  next();
});

const productsRouter = require('./src/routes/product');
const cartsRouter = require('./scr/routes/carts');

app.use('/api/product', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
});