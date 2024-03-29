import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { purchaseCart, getCart, saveCart, addProductCart, deleteProductCart, deleteCart, updateCart, updateQuantityCart } from '../../controllers/carts.controller.js';

export default class CartsRouter extends Router {
    init() {

        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, saveCart);

        this.get('/:cid', ['PUBLIC'], passportStrategiesEnum.NOTHING, getCart);
        this.put('/:cid', ['ADMIN', 'USER'], passportStrategiesEnum.JWT, updateCart);
        this.delete('/:cid', ['ADMIN', 'USER'], passportStrategiesEnum.JWT, deleteCart);
        
        this.post('/:cid/product/:pid', ['ADMIN', 'USER', 'PREMIUM'], passportStrategiesEnum.JWT, addProductCart);
        this.put('/:cid/product/:pid', ['ADMIN', 'USER'], passportStrategiesEnum.JWT, updateQuantityCart);
        this.delete('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, deleteProductCart);
        
        this.post('/:cid/purchase', ['USER','ADMIN','PREMIUM'], passportStrategiesEnum.JWT, purchaseCart);

    }
}