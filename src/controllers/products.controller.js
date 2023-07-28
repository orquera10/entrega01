import CustomError from '../middleware/errors/CustomError.js';
import EErrors from '../middleware/errors/enums.js';
import { generateProductErrorInfo } from '../middleware/errors/info.js';
import { getProductsService, getProductsByIdService, addProductService, updateProductsService, deleteProductService } from '../service/products.service.js';

const getAllProduct = async (req, res) =>{
    try {
        const products = await getProductsService();
        const limite = Number(req.query.limit) || products.length;
        const productView = products.slice(0, limite);
        req.logger.info('successfully get products');
        res.sendSuccess(productView);
    } catch (error) {
        req.logger.error('error get products');
        res.sendServerError(error.message);
    }
}

const getByIdProduct = async (req, res) =>{
    try {
        const productID = req.params.pid;
        const product = await getProductsByIdService(productID);
        if (!product) {
            const productError = 'Product not exist';
            req.logger.error(productError);
            return res.sendClientError(productError);
        }
        req.logger.info('successfully get product');
        res.sendSuccess(product);
    } catch (error) {
        req.logger.error('error get product');
        res.sendServerError(error.message);
    }
}

const saveProduct = async (req, res) =>{
    
        const product = req.body;
        
        if (product.status === null || product.status === undefined) {
            product.status = true;
        }
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            
            req.logger.error('error properties imcomplete');
            throw CustomError.createError({
                name: 'ProductError',
                cause: generateProductErrorInfo(product),
                message: 'Error trying to create product',
                code: EErrors.INVALID_TYPE_ERROR
            });

        }
        const result = await addProductService(product);
        req.logger.info('successfully save product');
        res.sendSuccess(result);
}

const updateProduct = async (req, res) =>{
    try {
        const productID = req.params.pid;
        const product = req.body;
        const encontrado = await getProductsByIdService(productID)
        if (!encontrado) {
            const productError = 'Product not exist';
            req.logger.error(productError);
            return res.sendClientError(productError);
        }
        const result = await updateProductsService(productID, product);
        req.logger.info('successfully update product');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error update product');
        res.sendServerError(error.message);
    }
}

const deleteProduct = async (req, res) =>{
    try {
        const productID = req.params.pid;
        const encontrado = await getProductByIdService(productID)
        if (!encontrado) {
            const productError = 'Product not exist';
            req.logger.error(productError);
            return res.sendClientError(productError);
        }
        const result = await deleteProductService(productID);
        req.logger.info('successfully delete product');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error delete product');
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