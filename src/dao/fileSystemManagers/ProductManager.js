import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }


    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) =>{
        try {
            const products = await this.getProducts();
            return products.find(item=>item.id===id);
        } catch (error) {
            console.log(error);
        }
    }

    updateProducts = async (id, product) =>{
        try {
            const products = await this.getProducts();

            const nuevoProducts = products.map( element => {
                if (element.id === id) {
                    return {...element,...product}   
                } else {
                    return element;
                }
            });
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoProducts, null, '\t'));
            return this.getProductById(id);
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{
        try {
            const products = await this.getProducts();
            const nuevoProducts = products.filter( product => {
                return product.id !== id;
            });
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoProducts, null, '\t'));
            
        } catch (error) {
            console.log(error);
        }
    }
}
