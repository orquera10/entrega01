const ProductManager = require("./index");

//Se creará una instancia de la clase “ProductManager”
const productos = new ProductManager();

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] 
console.log(productos.getProducts());

//Se llamará al método “addProduct”
productos.addProduct("producto prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log(productos.getProducts());

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productos.addProduct("producto prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);
console.log(productos.getProducts());

//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(productos.getProductById(0));