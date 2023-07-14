import fs from "fs";

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    addCarts = async (cart) => {
        try {
            const carts = await this.getCarts();
            if (carts.length === 0) {
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    getCartById = async (id) =>{
        try {
            const carts = await this.getCarts();
            const cart = carts.find(item=>item.id===id);
            return cart
        } catch (error) {
            console.log(error);
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
}

