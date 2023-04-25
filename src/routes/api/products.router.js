import { Router } from 'express';
import ProductManager from '../../managers/ProductManager.js';

const productManager = new ProductManager("./src/files/Products.json")
const router = Router();

router.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    const limite = Number(req.query.limit) || productos.length;
    const productView = productos.slice(0,limite);
    res.send({ status: 'success', productView });
});

router.get('/:pid', async (req, res) => {
    const productID = Number(req.params.pid);
    const product = await productManager.getProductById(productID);
    if (!product) {
        return res.status(400).send({ error: 'Producto no encontrado'});
    }
    res.send({status: 'success', product});
});

router.post('/', async (req, res) => {
        // {
        //     "title": "producto prueba",
        //     "description": "Este es un producto de prueba",
        //     "price": 200,
        //     "status": true,
        //     "thumbnail": ["http://pagina/imagen1.jpg","http://pagina/imagen2.jpg"],
        //     "code": "abc132",
        //     "category": "food",
        //     "stock": 25,
        //     "id": 3
        // }
    const product = req.body;
    if (product.status===null || product.status===undefined) {
        product.status = true;
    }
    if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
        return res.status(400).send({ error: 'Valores incompletos'});
    }
    const result = await productManager.addProduct(product);
    

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getProducts());

    res.send({ status: 'success', result });
});

router.put('/:pid', async (req, res) => {
        // {
        //     "title": "producto prueba",
        //     "description": "Este es un producto de prueba",
        //     "price": 200,
        //     "status": true,
        //     "thumbnail": ["http://pagina/imagen1.jpg","http://pagina/imagen2.jpg"],
        //     "code": "abc132",
        //     "category": "food",
        //     "stock": 25
        // }
    const productID = Number(req.params.pid);
    const product = req.body;
    const encontrado = await productManager.getProductById(productID)
    if (!encontrado) {
        return res.status(400).send({ error: 'Id no encontrado'});
    }
    const result = await productManager.updateProducts(productID,product);
    res.send({ status: 'success', result });
});

router.delete('/:pid', async (req, res) => {
    const productID = Number(req.params.pid);
    const encontrado = await productManager.getProductById(productID)
    if (!encontrado) {
        return res.status(400).send({ error: 'Id no encontrado'});
    }
    const result = await productManager.deleteProduct(productID);
    res.send({ status: 'success', result });
    
});

export default router;