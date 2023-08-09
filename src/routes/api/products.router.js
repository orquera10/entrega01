import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { getAllProduct, getByIdProduct, saveProduct, updateProduct, deleteProduct } from '../../controllers/products.controller.js';

export default class ProductsRouter extends Router {
    init() {
        this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, getAllProduct);
        this.get('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, getByIdProduct);
        this.post('/', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, saveProduct);
        this.put('/:pid', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, updateProduct);
        this.put('/:pid', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, deleteProduct);
    }
}