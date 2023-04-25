import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager(`./src/files/Products.json`);

router.get(`/`, async (req,res) => {
    res.render(`home`, { "products" : await productManager.getProducts()});
});

export default router;