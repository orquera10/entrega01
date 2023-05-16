import { Router } from "express";
import Products from "../../dao/dbManager/products.js";

const router = Router();
const productManager = new Products();



router.get(`/`, async (req,res) => {
    try {
        const productos = await productManager.getProducts();
        res.render(`home`, {products:productos});
    } catch (error) {
        console.log(error);
    }
    
});

router.get(`/realTimeProducts`, async (req,res) => {
    try {
        res.render(`realTimeProducts`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/chat', (req, res) => {    
    res.render('chat');
});

export default router;



