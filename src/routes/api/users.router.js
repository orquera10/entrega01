import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import {
    passwordLink,
    passwordReset,
    premium,
    upload,
    uploadDocuments,
    getAllUsers
} from '../../controllers/users.controller.js';
import { uploader } from '../../utils/utils.js';

export default class UsersRouter extends Router {
    init() {
        this.post('/password-link', ['PUBLIC'], passportStrategiesEnum.NOTHING, passwordLink);
        this.post('/reset-password', ['PUBLIC'], passportStrategiesEnum.NOTHING, passwordReset);
        this.post('/premium/:uid', ['ADMIN'], passportStrategiesEnum.JWT, premium);

        this.post('/:uid/profileImage', ['ADMIN'], passportStrategiesEnum.JWT, uploader.single('profileImage'), upload);
        this.post('/:uid/productImage', ['ADMIN'], passportStrategiesEnum.JWT, uploader.single('productImage'), upload);
        this.post('/:uid/documents', ['ADMIN'], passportStrategiesEnum.JWT, uploader.fields([
            { name: 'identificacion', maxCount: 1 },
            { name: 'domicilio', maxCount: 1 },
            { name: 'estadoCuenta', maxCount: 1 }
        ]), uploadDocuments);

        this.get('/getUsers', ['ADMIN'], passportStrategiesEnum.JWT, getAllUsers);
    }
}