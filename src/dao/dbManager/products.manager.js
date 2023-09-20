import { productModel } from "../dbManager/models/products.model.js";

export default class Products {
    constructor() {
        console.log('Working products with DB in mongoDB');
    }
    getProducts = async () => {
        const products = await productModel.find().lean();
        return products;
    }

    getProductsPaginate = async (filter, limit, page, sortBy) => {
        const result = await productModel.paginate(filter, { limit, page, lean: true, sort: sortBy });
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
        const result = await productModel.deleteOne({_id:id});
        return result;
    }
}
