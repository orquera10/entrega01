import ProductsRepository from '../repositories/products.repository.js';

const productsRepository = new ProductsRepository();

const getProductsService = async () => {
    const result = await productsRepository.getProducts();
    return result;
}

const getProductsByIdService = async (pid) => {
    const result = await productsRepository.getProductsById(pid);
    return result;
}

const addProductService = async (product) => {
    const result = await productsRepository.addProduct(product);
    return result;
}

const updateProductsService = async (pid,product) => {
    const result = await productsRepository.updateProducts(pid,product);
    return result;
}

const deleteProductService = async (pid) => {
    const result = await productsRepository.deleteProduct(pid);
    return result;
}

const getProductsPaginateService = async (filter,limit,page,sortBy,category,status,sort) => {
    const result = await productsRepository.getProductsPaginate(filter,limit,page,sortBy,category,status,sort);
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