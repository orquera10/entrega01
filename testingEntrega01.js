import { ProductManager } from "./entrega01";


const productos = new ProductManager();
console.log(productos.getProducts());

productos.addProduct("producto prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);
console.log(productos.getProducts());

productos.addProduct("producto prueba","Este es un producto de prueba",200,"sin imagen","abc123",25);
console.log(productos.getProducts());

console.log(productos.getProductById(0));