import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager(`./src/files/Products.json`);
const productos = await productManager.getProducts();

router.get(`/`, async (req,res) => {
    res.render(`home`, {products:productos});
});

router.get(`/realTimeProducts`, async (req,res) => {
    res.render(`realTimeProducts`);
    
    const io = req.app.get('socketio');
    io.on('connection', socket =>{
        socket.emit("showProducts", productos);
        console.log('cliente conectado');
    })
});

export default router;