
// const ProductManager = require("./manager/ProductManager.js");

// //Se creará una instancia de la clase “ProductManager”
// const productos = new ProductManager();

// //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] 
// console.log(productos.getProducts());

// //Se llamará al método “addProduct”
// productos.addProduct("producto prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);

// //El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// console.log(productos.getProducts());

// //Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// productos.addProduct("producto prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);
// console.log(productos.getProducts());

// //Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// console.log(productos.getProductById(0));




// (title, description, price, thumbnail,code,stock)
// const validarCode = this.products.find(item=>item.code===code);
// if (validarCode) {
//     console.log(`El code ${code} ya esta en uso`);
//     return
// }

// if(!title || !description || !price || !thumbnail || !code || stock==null) {
//     console.log(`Todos los campos son obligatorios.`);
//     return
// }


// const product = {
//     title,
//     description,
//     price,
//     thumbnail,
//     code,
//     stock
// };
import ProductManager  from "./manager/ProductManager.js";

const manager = new ProductManager(`./data/Products.json`)

const env = async () => {
    const productos = await manager.getProducts();
    console.log(productos);

    const producto = {
        title: 'producto prueba',
        description: 'Este es un producto de prueba',
        price: 200,
        thumbnail: 'sin imagen',
        code: 'abc123',
        stock: 25
    };

    await manager.addProduct(producto);

    const productsResult = await manager.getProducts();
    console.log(productsResult);

    const productoMod = {
        // title: 'producto pruebaC',
        // description: 'Este es un producto de prueba',
        price: 205,
        // thumbnail: 'sin imagen',
        code: 'abc124',
        //stock: 29
    };
    await manager.updateProducts(10,productoMod);

    await manager.deleteProduct(5);

    console.log(await manager.getProductById(10));
}

// console.log(await products.getProducts());
env()