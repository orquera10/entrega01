class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }


    addProduct = (title, description, price, thumbnail,code,stock) => {

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        const validarCode = this.products.find(item=>item.code===code);

        if (validarCode) {
            console.log(`El code ${code} ya esta en uso`);
            return
        }

        if(!title || !description || !price || !thumbnail || !code || stock==null) {
            console.log(`Todos los campos son obligatorios.`);
            return
        }
        // if(title==null || description==null || price==null || thumbnail==null || code==null || stock==null) {
        //     console.log(`Todos los campos son obligatorios.`);
        //     return
        // }
        
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        
        this.products.push(product);
        
    }

    getProductById = (id) =>{
        const productoEncontrado = this.products.find(item=>item.id===id)
        if (productoEncontrado) {
            return productoEncontrado;
        } else {
            return `Not found`;
        }
    }
}

export default ProductManager;
