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
    callbackFacebook
} from '../../controllers/sessions.controller.js';

export default class SessionsRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, userLogin);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, userRegister);

        this.get('/logout', ['ADMIN', 'USER', 'PREMIUM'], passportStrategiesEnum.JWT, userLogout);
        this.get('/current', ['ADMIN', 'USER'], passportStrategiesEnum.JWT, userCurrent);

        this.get('/github', ['PUBLIC'], passportStrategiesEnum.github, logGithub);
        this.get('/github-callback', ['PUBLIC'], passportStrategiesEnum.github, callbackGithub);
        this.get('/google', ['PUBLIC'], passportStrategiesEnum.google, logGoogle);
        this.get('/google-callback', ['PUBLIC'], passportStrategiesEnum.google, callbackGoogle);
        this.get('/facebook', ['PUBLIC'], passportStrategiesEnum.facebook, logFacebook);
        this.get('/facebook-callback', ['PUBLIC'], passportStrategiesEnum.facebook, callbackFacebook);

    }
}