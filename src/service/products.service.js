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
    const products = await productsRepository.getProductsPaginate(filter,limit,page,sortBy);
    const result = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&limit=${limit}&category=${category}&status=${status}&sort=${sort}` : null,
        nextLink: products.hasNextPage ? `/products?page=${products.nextPage}&limit=${limit}&category=${category}&status=${status}&sort=${sort}` : null
    }
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