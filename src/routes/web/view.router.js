import { Router } from "express";
import ProductManager from "../../dao/fileSystemManagers/ProductManager.js";

const router = Router();
const productManager = new ProductManager(`./src/files/Products.json`);
const productos = await productManager.getProducts();

router.get(`/`, async (req,res) => {
    res.render(`home`, {products:productos});
});

router.get(`/realTimeProducts`, async (req,res) => {
    res.render(`realTimeProducts`);
});

export default router;