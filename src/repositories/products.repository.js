import { Products } from '../dao/factory.js'

export default class ProductsRepository {
    constructor() {
        this.dao = Products;
    }
    getProducts = async () => {
        const result = await this.dao.getProducts();
        return result;
    }
    getProductsById = async (pid) => {
        const result = await this.dao.getProductById(pid);
        return result;
    }
    addProduct = async (product) => {
        const result = await this.dao.addProduct(product);
        return result;
    }
    updateProducts = async (pid,product) => {
        const result = await this.dao.updateProducts(pid,product);
        return result;
    }
    deleteProduct = async (pid) => {
        const result = await this.dao.deleteProduct(pid);
        return result;
    }
    getProductsPaginate = async (filter,limit,page,sortBy,category,status,sort) => {
        const result = await this.dao.getProductsPaginate(filter,limit,page,sortBy,category,status,sort);
        return result;
    }
}