import { productModel } from "../models/products.model.js";

export default class Products {
    constructor() {
        console.log('Working products with DB in mongoDB');
    }
    getProducts = async () => {
        const products = await productModel.find().lean();
        return products;
    }

    getProductsPaginate = async (filter, limit, page, sortBy, category, status, sort) => {
        const products = await productModel.paginate(filter, { limit, page, lean: true, sort: sortBy });
        
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

    addProduct = async (product) => {
        const result = await productModel.create(product);
        return result;
    }

    getProductById = async (id) =>{
        const result = await productModel.findOne({_id:id}).lean();
        return result;
    }

    updateProducts = async (id, product) =>{
        const result = await productModel.updateOne({_id:id},product);
        return result;
    }

    deleteProduct = async (id) =>{
        const result = await productModel.deleteOne({_id:id})
    }
}
