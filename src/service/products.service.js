import { PRODUCTSDAO } from '../dao/index.js';

const getProductsService = async () => {
    const result = await PRODUCTSDAO.getProducts();
    return result;
}

const getProductsByIdService = async (pid) => {
    const result = await PRODUCTSDAO.getProductById(pid);
    return result;
}

const addProductService = async (product) => {
    const result = await PRODUCTSDAO.addProduct(product);
    return result;
}

const updateProductsService = async (pid,product) => {
    const result = await PRODUCTSDAO.updateProducts(pid,product);
    return result;
}

const deleteProductService = async (pid) => {
    const result = await PRODUCTSDAO.deleteProduct(pid);
    return result;
}

const getProductsPaginateService = async (filter,limit,page,sortBy,category,status,sort) => {
    const result = await PRODUCTSDAO.getProductsPaginate(filter,limit,page,sortBy,category,status,sort);
    return result;
}

export{
    getProductsService,
    getProductsByIdService,
    addProductService,
    updateProductsService,
    deleteProductService,
    getProductsPaginateService
}