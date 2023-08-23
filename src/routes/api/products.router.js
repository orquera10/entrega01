import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { getAllProduct, getByIdProduct, saveProduct, updateProduct, deleteProduct } from '../../controllers/products.controller.js';

export default class ProductsRouter extends Router {
    init() {
        this.get('/', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, getAllProduct);
        this.post('/', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, saveProduct);
        this.get('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, getByIdProduct);
        this.put('/:pid', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, updateProduct);
        this.delete('/:pid', ['ADMIN', 'PREMIUM'], passportStrategiesEnum.JWT, deleteProduct);
    }
}