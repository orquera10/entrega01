import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { getCart, saveCart, addProductCart, deleteProductCart, deleteCart, updateCart, updateQuantityCart } from '../../controllers/carts.controller.js';




export default class CartsRouter extends Router {
    init() {
        this.get('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, getCart);
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, saveCart);
        this.post('/:cid/product/:pid', ['ADMIN','USER'], passportStrategiesEnum.JWT, addProductCart);
        this.delete('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, deleteProductCart);
        this.delete('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, deleteCart);
        this.put('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, updateCart);
        this.put('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, updateQuantityCart);
    }
}