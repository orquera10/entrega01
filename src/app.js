import express from 'express'; 

import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager('./data/Products.json');

app.get('/products', async (req, res) => {
    const productos = await productManager.getProducts();
    const limite = Number(req.query.limit) || productos.length;
    const productView = productos.slice(0,limite);
    res.send(productView);
});

app.get('/products/:pid', async (req, res) => {
    const productID = Number(req.params.pid);
    const producto = await productManager.getProductById(productID);
    if (producto===`Not found`) {
        res.send({error: `Producto no encontrado`});
    } else{
        res.send(producto);
    }
});

app.listen(8080,()=>console.log("Listening on 8080"))