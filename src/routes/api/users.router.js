import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import {
    userLogin,
    userCurrent,
    userLogout,
    userRegister,
    logGithub,
    logFacebook,
    logGoogle,
    callbackGithub,
    callbackGoogle,
    callbackFacebook,
    passwordLink,
    passwordReset,
    premium,
    upload
} from '../../controllers/users.controller.js';
import { uploader } from '../../utils/utils.js';

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, userLogin);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, userRegister);

        this.get('/logout', ['PUBLIC'], passportStrategiesEnum.NOTHING, userLogout);
        this.get('/current', ['ADMIN', 'USER'], passportStrategiesEnum.JWT, userCurrent);

        this.get('/github', ['PUBLIC'], passportStrategiesEnum.github, logGithub);
        this.get('/github-callback', ['PUBLIC'], passportStrategiesEnum.github, callbackGithub);
        this.get('/google', ['PUBLIC'], passportStrategiesEnum.google, logGoogle);
        this.get('/google-callback', ['PUBLIC'], passportStrategiesEnum.google, callbackGoogle);
        this.get('/facebook', ['PUBLIC'], passportStrategiesEnum.facebook, logFacebook);
        this.get('/facebook-callback', ['PUBLIC'], passportStrategiesEnum.facebook, callbackFacebook);

        this.post('/password-link', ['PUBLIC'], passportStrategiesEnum.NOTHING, passwordLink);
        this.post('/reset-password', ['PUBLIC'], passportStrategiesEnum.NOTHING, passwordReset);
        this.post('/premium/:uid', ['ADMIN'], passportStrategiesEnum.JWT, premium);

        this.post('/documents', ['PUBLIC'], passportStrategiesEnum.NOTHING, uploader.single('file'), upload);
        
    }
}