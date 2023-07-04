import Router from '../router.js';
import Products from '../../dao/dbManager/products.manager.js';
import { passportStrategiesEnum } from '../../config/enums.js';

const productManager = new Products()

export default class ProductsRouter extends Router {
    init() {
        this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, this.getAll);
        this.get('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.getAllById);
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, this.save);
        this.put('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.update);
        this.put('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.delete);
    }
    async getAll(req, res) {
        try {
            const products = await productManager.getProducts();
            const limite = Number(req.query.limit) || products.length;
            const productView = products.slice(0, limite);
            res.sendSuccess(productView);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async getById(req, res) {
        try {
            const productID = req.params.pid;
            const product = await productManager.getProductById(productID);
            if (!product) {
                return res.status(400).send({ error: 'Producto no encontrado' });
            }
            res.sendSuccess(product);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async save(req, res) {
        try {
            const product = req.body;

            if (product.status === null || product.status === undefined) {
                product.status = true;
            }
            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
                return res.sendClientError('incomplete values');
            }
            const result = await productManager.addProduct(product);
    
    
            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());
    
            res.sendSuccess(result);

        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async update(req, res) {
        try {
            const productID = req.params.pid;
            const product = req.body;
            const encontrado = await productManager.getProductById(productID)
            if (!encontrado) {
                return res.status(400).send({ error: 'Id no encontrado' });
            }
            const result = await productManager.updateProducts(productID, product);
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }
    
    async delete(req, res) {
        try {
            const productID = req.params.pid;
            const encontrado = await productManager.getProductById(productID)
            if (!encontrado) {
                return res.status(400).send({ error: 'Id no encontrado' });
            }
            const result = await productManager.deleteProduct(productID);

            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }
}