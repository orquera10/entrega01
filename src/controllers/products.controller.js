import { getProductsService, getProductsByIdService, addProductService, updateProductsService, deleteProductService } from '../service/products.service.js';


const getAllProduct = async (req, res) =>{
    try {
        const products = await getProductsService();
        const limite = Number(req.query.limit) || products.length;
        const productView = products.slice(0, limite);
        res.sendSuccess(productView);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getByIdProduct = async (req, res) =>{
    try {
        const productID = req.params.pid;
        const product = await getProductsByIdService(productID);
        if (!product) {
            return res.status(400).send({ error: 'Producto no encontrado' });
        }
        res.sendSuccess(product);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const saveProduct = async (req, res) =>{
    try {
        const product = req.body;

        if (product.status === null || product.status === undefined) {
            product.status = true;
        }
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            return res.sendClientError('incomplete values');
        }
        const result = await addProductService(product);

        res.sendSuccess(result);

    } catch (error) {
        res.sendServerError(error.message);
    }
}

const updateProduct = async (req, res) =>{
    try {
        const productID = req.params.pid;
        const product = req.body;
        const encontrado = await getProductByIdService(productID)
        if (!encontrado) {
            return res.status(400).send({ error: 'Id no encontrado' });
        }
        const result = await updateProductsService(productID, product);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const deleteProduct = async (req, res) =>{
    try {
        const productID = req.params.pid;
        const encontrado = await getProductByIdService(productID)
        if (!encontrado) {
            return res.status(400).send({ error: 'Id no encontrado' });
        }
        const result = await deleteProductService(productID);

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}


export {
    getAllProduct,
    getByIdProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}