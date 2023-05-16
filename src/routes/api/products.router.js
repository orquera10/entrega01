import { Router } from 'express';
import Products from '../../dao/dbManager/products.js';

const productManager = new Products()
const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        const limite = Number(req.query.limit) || productos.length;
        const productView = productos.slice(0, limite);
        res.send({ status: 'success', payload: productView });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
    
});

router.get('/:pid', async (req, res) => {
    try {
        const productID = Number(req.params.pid);
        const product = await productManager.getProductById(productID);
        if (!product) {
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        res.send({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
    
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
    try {
        const product = req.body;
        if (product.status === null || product.status === undefined) {
            product.status = true;
        }
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            return res.status(400).send({ error: 'Valores incompletos' });
        }
        const result = await productManager.addProduct(product);


        const io = req.app.get('socketio');
        io.emit("showProducts", await productManager.getProducts());

        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
    
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
    try {
        const productID = Number(req.params.pid);
        const product = req.body;
        const encontrado = await productManager.getProductById(productID)
        if (!encontrado) {
            return res.status(400).send({ error: 'Id no encontrado' });
        }
        const result = await productManager.updateProducts(productID, product);
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
    
});

router.delete('/:pid', async (req, res) => {
    try {
        const productID = Number(req.params.pid);
        const encontrado = await productManager.getProductById(productID)
        if (!encontrado) {
            return res.status(400).send({ error: 'Id no encontrado' });
        }
        const result = await productManager.deleteProduct(productID);

        const io = req.app.get('socketio');
        io.emit("showProducts", await productManager.getProducts());
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});




export default router;