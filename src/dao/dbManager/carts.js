import { cartModel } from "../models/carts.js";

export default class Carts {
    constructor() {
        console.log('Working carts with DB in mongoDB');
    }
    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    addCarts = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    getCarttById = async (id) =>{
        const result = await cartModel.find({_id:id}).lean();
        return result;
    }

    addProductToCart = async (cartId, productId) =>{
        



        const result = await productModel.updateOne({_id:id},product);
        return result;
    }
}


addProductToCart = async (cartId, productId) => {
    try {
        const carts = await this.getCarts();

        const indexCart = carts.findIndex(elemen=>elemen.id===cartId);
        const products = carts[indexCart].products;
        const indexProduct = products.findIndex(elemen=> elemen.product===productId);

        if (indexProduct===-1) {
            products.push({product:productId, quantity:1});
        } else{
            products[indexProduct].quantity+=1;
        }
    
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return this.getCartById(cartId);
    } catch (error) {
        console.log(error);
    }
}