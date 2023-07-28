import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { purchaseCart, getCart, saveCart, addProductCart, deleteProductCart, deleteCart, updateCart, updateQuantityCart } from '../../controllers/carts.controller.js';

export default class CartsRouter extends Router {
    init() {
        
        this.get('/:cid', ['PUBLIC'], passportStrategiesEnum.NOTHING, getCart);
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, saveCart);
        this.post('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, addProductCart);
        this.delete('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, deleteProductCart);
        this.delete('/:cid', ['ADMIN','USER'], passportStrategiesEnum.JWT, deleteCart);
        this.put('/:cid', ['ADMIN','USER'], passportStrategiesEnum.JWT, updateCart);
        this.put('/:cid/product/:pid', ['ADMIN','USER'], passportStrategiesEnum.JWT, updateQuantityCart);
        this.post('/:cid/purchase', ['USER'], passportStrategiesEnum.JWT, purchaseCart);
        
    }
}