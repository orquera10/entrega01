import ProductManager  from "./src/ProductManager.js";


//Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager(`./data/Products.json`)

const env = async () => {

    //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    let productos = await manager.getProducts();
    console.log(productos);

    //Se llamará al método “addProduct” con los campos:
    const producto = {
        title: 'producto prueba',
        description: 'Este es un producto de prueba',
        price: 200,
        thumbnail: 'sin imagen',
        code: 'abc140',
        stock: 25
    };
    await manager.addProduct(producto);
    //El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

    //Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    productos = await manager.getProducts();
    console.log(productos);

    //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
    let productoPorID = await manager.getProductById(3)
    console.log(productoPorID);

    //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    const productoMod = {
        // title: 'producto pruebaC',
        // description: 'Este es un producto de prueba',
        price: 205,
        // thumbnail: 'sin imagen',
        code: 'abc125',
        //stock: 29
    };
    await manager.updateProducts(1,productoMod);
    productoPorID = await manager.getProductById(1)
    console.log(productoPorID);

    //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    await manager.deleteProduct(3);
    productos = await manager.getProducts();
    console.log(productos);
}
env();